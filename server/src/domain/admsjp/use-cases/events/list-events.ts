import { Injectable } from '@nestjs/common'
import { Profile, User } from '@prisma/client'

import { Either, success } from '@/core/either'
import { ListOptions } from '@/core/repositories/list-options'
import { SearchParams } from '@/core/repositories/search-params'
import { EventsRepository } from '@/domain/admsjp/repositories/events-repository'

import { EventPurchasesRepository } from '../../repositories/event-purchases-repository'
import { EventTicketsRepository } from '../../repositories/event-tickets-repository'
import { EventInfo } from '../../types/event'

interface ListEventsUseCaseRequest {
  roles: Array<Profile['name']>
  departmentId: User['departmentId']
  options?: ListOptions
  searchParams?: SearchParams[]
}

type ListEventsUseCaseResponse = Either<
  null,
  {
    events: EventInfo[]
  }
>

@Injectable()
export class ListEventsUseCase {
  constructor(
    private eventsRepository: EventsRepository,
    private eventPurchasesRepository: EventPurchasesRepository,
    private eventTicketsRepository: EventTicketsRepository,
  ) {}

  async execute({
    roles,
    departmentId,
    options = {},
    searchParams = [],
  }: ListEventsUseCaseRequest): Promise<ListEventsUseCaseResponse> {
    // Se o usuário não é administrador, só pode visualizar eventos do departamento que ele faz parte
    if (!roles.includes('ADMIN')) {
      searchParams.push({
        condition: 'equals',
        field: 'visible',
        value: 1,
      })

      searchParams.push({
        condition: 'equals',
        field: 'departmentId',
        value: departmentId,
      })
    }

    const events = await this.eventsRepository.list(options, searchParams)

    const eventsWithInfo: EventInfo[] = []

    for (const event of events) {
      const qtyPurchases = await this.eventPurchasesRepository.countByEventId(
        event.id,
      )

      const qtyTickets = await this.eventTicketsRepository.countByEventId(
        event.id,
      )

      eventsWithInfo.push({
        ...event,
        qtyPurchases,
        qtyTickets,
      })
    }

    return success({
      events: eventsWithInfo,
    })
  }
}
