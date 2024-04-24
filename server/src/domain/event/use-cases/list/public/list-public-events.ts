import { Injectable } from '@nestjs/common'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { IListOptions } from '@/core/repositories/list-options'
import { ListEventDTO } from '@/domain/event/dtos/list-event.dto'
import { EventsRepository } from '@/domain/event/repositories/events-repository'

@Injectable()
export class ListPublicEventsUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute(
    options: IListOptions = {},
    searchParams: ISearchParamDTO[] = [],
  ): Promise<ListEventDTO> {
    const { events, count } = await this.eventsRepository.list(
      options,
      searchParams,
    )

    return { events, count }
  }
}
