import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { z } from 'zod'

import { CreateDepartmentUseCase } from '@/domain/admsjp/use-cases/departments/create-department'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const createDepartmentSchema = z.object({
  name: z.string(),
  description: z.string(),
  visible: z.number().int().min(0).max(1).optional(),
  status: z.number().int().min(0).max(1).optional(),
})

type CreateDepartmentSchema = z.infer<typeof createDepartmentSchema>

const bodyValidationPipe = new ZodValidationPipe(createDepartmentSchema)

@Controller('/')
export class CreateDepartmentController {
  constructor(private createDepartment: CreateDepartmentUseCase) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async handle(
    @Body(bodyValidationPipe) body: CreateDepartmentSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { name, description, status, visible } = body

    const profile = await this.createDepartment.execute({
      name,
      description,
      status,
      visible,
      createdBy: user.sub.id,
    })

    return profile
  }
}
