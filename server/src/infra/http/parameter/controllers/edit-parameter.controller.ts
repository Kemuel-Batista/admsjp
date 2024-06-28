import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Put,
} from '@nestjs/common'
import { z } from 'zod'

import { EditParameterUseCase } from '@/domain/admsjp/use-cases/parameters/edit-parameter'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

const editParameterSchema = z.object({
  key: z.string(),
  keyInfo: z.string(),
  value: z.string(),
  visible: z.number().int().min(0).max(1).optional(),
  status: z.number().int().min(0).max(1).optional(),
})

type EditParameterSchema = z.infer<typeof editParameterSchema>

const bodyValidationPipe = new ZodValidationPipe(editParameterSchema)

const editEventParamSchema = z.string().uuid()
const paramValidationPipe = new ZodValidationPipe(editEventParamSchema)
type ParamSchema = z.infer<typeof editEventParamSchema>

@Controller('/:id')
export class EditParameterController {
  constructor(private editParameter: EditParameterUseCase) {}

  @Put()
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(
    @Param('id', paramValidationPipe) id: ParamSchema,
    @Body(bodyValidationPipe) body: EditParameterSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { key, keyInfo, value, status, visible } = body

    const parameter = await this.editParameter.execute({
      id,
      key,
      keyInfo,
      value,
      visible,
      status,
      updatedBy: user.sub.id,
    })

    return {
      parameter,
    }
  }
}
