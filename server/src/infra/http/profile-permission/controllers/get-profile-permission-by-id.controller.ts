import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common'
import { z } from 'zod'

import { UserProfile } from '@/domain/admsjp/enums/user'
import { GetProfilePermissionByIdUseCase } from '@/domain/admsjp/use-cases/profile-permission/get-profile-permission-by-id'
import { ProfileGuard } from '@/infra/auth/profile.guard'
import { Profiles } from '@/infra/auth/profiles'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const paramSchema = z.string().transform(Number).pipe(z.number().min(1))

const paramValidationPipe = new ZodValidationPipe(paramSchema)

type ParamSchema = z.infer<typeof paramSchema>

@Controller('/:id')
export class GetProfilePermissionByIdController {
  constructor(
    private getProfilePermissionById: GetProfilePermissionByIdUseCase,
  ) {}

  @Profiles(UserProfile.ADMINISTRADOR)
  @UseGuards(ProfileGuard)
  @Get()
  async handle(@Param('id', paramValidationPipe) id: ParamSchema) {
    const result = await this.getProfilePermissionById.execute({
      id,
    })

    if (result.isError()) {
      throw new BadRequestException()
    }

    const profilePermission = result.value.profilePermission

    return {
      profilePermission,
    }
  }
}
