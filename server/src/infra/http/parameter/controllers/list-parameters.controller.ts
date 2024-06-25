import { BadRequestException, Controller, Get, UseGuards } from '@nestjs/common'

import { UserProfile } from '@/domain/admsjp/enums/user'
import { ListParametersUseCase } from '@/domain/admsjp/use-cases/parameters/list-parameters'
import { ProfileGuard } from '@/infra/auth/profile.guard'
import { Profiles } from '@/infra/auth/profiles'

@Controller('/')
export class ListParametersController {
  constructor(private listParametersUseCase: ListParametersUseCase) {}

  @Profiles(UserProfile.ADMINISTRADOR)
  @UseGuards(ProfileGuard)
  @Get()
  async handle() {
    const result = await this.listParametersUseCase.execute({})

    if (result.isError()) {
      throw new BadRequestException()
    }

    const { parameters, count } = result.value

    return {
      parameters,
      count,
    }
  }
}
