import { Injectable } from '@nestjs/common'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { IListOptions } from '@/core/repositories/list-options'
import { ListEventDTO } from '@/domain/event/dtos/list-event.dto'
import { EventsRepository } from '@/domain/event/repositories/events-repository'
import { UserProfile } from '@/domain/user/enums/user-profile'
import { UserWithPermission } from '@/domain/user/types/user-with-permission'

@Injectable()
export class ListEventsUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute(
    options: IListOptions = {},
    searchParams: ISearchParamDTO[] = [],
    profileId: UserWithPermission['profileId'],
    departmentId: UserWithPermission['departmentId'],
  ): Promise<ListEventDTO> {
    // Se o usuário não é administrador, só pode visualizar eventos do departamento que ele faz parte
    if (profileId !== UserProfile.ADMINISTRADOR) {
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

    const { events, count } = await this.eventsRepository.list(
      options,
      searchParams,
    )

    return { events, count }
  }
}
