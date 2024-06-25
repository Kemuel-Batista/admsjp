import { BadRequestException, Controller, Get } from '@nestjs/common'

import { ListPublicEventsUseCase } from '@/domain/admsjp/use-cases/events/list-public-events'
import { Public } from '@/infra/auth/public'

@Controller('/public')
@Public()
export class ListPublicEventsController {
  constructor(private listPublicEventsUseCase: ListPublicEventsUseCase) {}

  @Get()
  async handle() {
    const result = await this.listPublicEventsUseCase.execute({})

    if (result.isError()) {
      throw new BadRequestException('Error fetching list of public events')
    }

    const { events, count } = result.value

    return {
      events,
      'x-total-count': count,
    }
  }
}
