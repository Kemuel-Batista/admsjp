import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { z } from 'zod'

import { CreateParameterUseCase } from '@/domain/admsjp/use-cases/parameters/create-parameter'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

const createParameterSchema = z.object({
  key: z.string(),
  keyInfo: z.string(),
  value: z.string(),
  visible: z.number().int().min(0).max(1).optional(),
  status: z.number().int().min(0).max(1).optional(),
})

type CreateParameterSchema = z.infer<typeof createParameterSchema>

const bodyValidationPipe = new ZodValidationPipe(createParameterSchema)

@Controller('/')
export class CreateParameterController {
  constructor(private createParameter: CreateParameterUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(
    @Body(bodyValidationPipe) body: CreateParameterSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { key, keyInfo, value, status, visible } = body

    const parameter = await this.createParameter.execute({
      key,
      keyInfo,
      value,
      visible,
      status,
      createdBy: user.sub.id,
    })

    return {
      parameter,
    }
  }
}
