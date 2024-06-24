import { Injectable } from '@nestjs/common'

import { Either, failure, success } from '@/core/either'
import { ResourceHasAssociationsError } from '@/core/errors/errors/resource-has-associations-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { EventLotsRepository } from '../../repositories/event-lots-repository'
import { EventTicketsRepository } from '../../repositories/event-tickets-repository'

interface EditEventLotUseCaseRequest {
  id: string
  eventId: number
  lot: number
  quantity: number
  value: number
  status: number
}

type EditEventLotUseCaseResponse = Either<
  ResourceNotFoundError | ResourceHasAssociationsError,
  null
>

@Injectable()
export class EditEventLotUseCase {
  constructor(
    private eventLotsRepository: EventLotsRepository,
    private eventTicketsRepository: EventTicketsRepository,
  ) {}

  async execute({
    id,
    lot,
    quantity,
    value,
    status,
  }: EditEventLotUseCaseRequest): Promise<EditEventLotUseCaseResponse> {
    const eventLot = await this.eventLotsRepository.findById(id)

    if (!eventLot) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'eventLot.find.notFound',
          key: lot.toString(),
        }),
      )
    }

    const doesEventLotHasAssociations =
      await this.eventTicketsRepository.listByEventLotId(id)

    if (doesEventLotHasAssociations.length === 0) {
      eventLot.value = value
      eventLot.status = status
    }

    eventLot.quantity = quantity

    await this.eventLotsRepository.save(eventLot)

    return success(null)
  }
}
