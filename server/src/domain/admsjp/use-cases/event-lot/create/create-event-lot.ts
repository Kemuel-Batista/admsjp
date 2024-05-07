import { Injectable } from '@nestjs/common'
import { EventLot } from '@prisma/client'

import { CreateEventLotDTO } from '@/domain/admsjp/dtos/event-lot'
import { EventLotsRepository } from '@/domain/admsjp/repositories/event-lots-repository'

import { FindEventByIdUseCase } from '../../events/find/by-id/find-event-by-id'
import { FindMaxEventLotByEventIdUseCase } from '../find/max-lot-by-event-id/find-max-event-lot-by-event-id'

@Injectable()
export class CreateEventLotUseCase {
  constructor(
    private eventLotsRepository: EventLotsRepository,
    private findEventByIdUseCase: FindEventByIdUseCase,
    private findMaxEventLotByEventIdUseCase: FindMaxEventLotByEventIdUseCase,
  ) {}

  async execute({
    eventId,
    quantity,
    status = 1,
    value,
    createdBy,
  }: CreateEventLotDTO): Promise<EventLot> {
    await this.findEventByIdUseCase.execute(eventId, {
      throwIfFound: true,
    })

    const maxEventLot =
      await this.findMaxEventLotByEventIdUseCase.execute(eventId)

    const eventLot = await this.eventLotsRepository.create({
      eventId,
      quantity,
      lot: maxEventLot + 1,
      status,
      value,
      createdBy,
    })

    return eventLot
  }
}
