import { BadRequestException, Controller, Get, UseGuards } from '@nestjs/common'

import { UserProfile } from '@/domain/admsjp/enums/user'
import { ListEventsUseCase } from '@/domain/admsjp/use-cases/events/list-events'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ProfileGuard } from '@/infra/auth/profile.guard'
import { Profiles } from '@/infra/auth/profiles'

@Controller('/')
export class ListEventsController {
  constructor(private listEventsUseCase: ListEventsUseCase) {}

  @Profiles(UserProfile.ADMINISTRADOR, UserProfile.EVENTS)
  @UseGuards(ProfileGuard)
  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const result = await this.listEventsUseCase.execute({
      profileId: user.sub.profileId,
      departmentId: user.sub.departmentId,
    })

    if (result.isError()) {
      throw new BadRequestException('Error fetching list of events')
    }

    const { events, count } = result.value

    return {
      events,
      'x-total-count': count,
    }
  }
}
