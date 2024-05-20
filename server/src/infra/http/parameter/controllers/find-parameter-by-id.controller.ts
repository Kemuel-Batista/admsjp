import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { z } from 'zod'

import { UserProfile } from '@/domain/admsjp/enums/user'
import { FindParameterByIdUseCase } from '@/domain/admsjp/use-cases/parameters/find-parameter-by-id'
import { ProfileGuard } from '@/infra/auth/profile.guard'
import { Profiles } from '@/infra/auth/profiles'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

const findParameterParamSchema = z.coerce.number().int().positive()
const paramValidationPipe = new ZodValidationPipe(findParameterParamSchema)
type ParamSchema = z.infer<typeof findParameterParamSchema>

@Controller('/:id')
export class FindParameterByIdController {
  constructor(private findParameterById: FindParameterByIdUseCase) {}

  @Profiles(UserProfile.ADMINISTRADOR)
  @UseGuards(ProfileGuard)
  @Get()
  async handle(@Param('id', paramValidationPipe) id: ParamSchema) {
    const parameter = await this.findParameterById.execute({
      id,
    })

    return {
      parameter,
    }
  }
}
