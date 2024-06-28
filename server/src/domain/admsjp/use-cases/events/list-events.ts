import { Injectable } from '@nestjs/common'
import { Event, Profile, User } from '@prisma/client'

import { Either, success } from '@/core/either'
import { ListOptions } from '@/core/repositories/list-options'
import { SearchParams } from '@/core/repositories/search-params'
import { EventsRepository } from '@/domain/admsjp/repositories/events-repository'

interface ListEventsUseCaseRequest {
  roles: Array<Profile['name']>
  departmentId: User['departmentId']
  options?: ListOptions
  searchParams?: SearchParams[]
}

type ListEventsUseCaseResponse = Either<
  null,
  {
    events: Event[]
  }
>

@Injectable()
export class ListEventsUseCase {
  constructor(private eventsRepository: EventsRepository) {}

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

    return success({
      events,
    })
  }
}
