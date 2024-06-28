import { BadRequestException, Controller, Get } from '@nestjs/common'

import { ListEventsUseCase } from '@/domain/admsjp/use-cases/events/list-events'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

@Controller('/')
export class ListEventsController {
  constructor(private listEventsUseCase: ListEventsUseCase) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const result = await this.listEventsUseCase.execute({
      roles: user.sub.roles,
      departmentId: user.sub.departmentId,
    })

    if (result.isError()) {
      throw new BadRequestException('Error fetching list of events')
    }

    const events = result.value.events

    return {
      events,
    }
  }
}
