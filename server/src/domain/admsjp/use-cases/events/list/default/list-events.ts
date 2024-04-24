import { Injectable } from '@nestjs/common'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { IListOptions } from '@/core/repositories/list-options'
import { ListEventDTO } from '@/domain/admsjp/dtos/event'
import { UserProfile } from '@/domain/admsjp/enums/user'
import { EventsRepository } from '@/domain/admsjp/repositories/events-repository'
import { UserWithPermission } from '@/domain/admsjp/types/user/user-with-permission'

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
