import { Controller, Get, HttpCode, Param } from '@nestjs/common'
import { z } from 'zod'

import HttpStatusCode from '@/core/enums/HttpStatusCode'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { FindProfilePermissionByIdUseCase } from './find-profile-permission-by-id'

const paramSchema = z.string().transform(Number).pipe(z.number().min(1))

const paramValidationPipe = new ZodValidationPipe(paramSchema)

type ParamSchema = z.infer<typeof paramSchema>

@Controller('/:id')
export class FindProfilePermissionByIdController {
  constructor(
    private findProfilePermissionById: FindProfilePermissionByIdUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatusCode.OK)
  async handle(@Param('id', paramValidationPipe) id: ParamSchema) {
    const profilePermission = await this.findProfilePermissionById.execute(id)

    return {
      profilePermission,
    }
  }
}
