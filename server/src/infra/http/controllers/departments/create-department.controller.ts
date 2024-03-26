import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { z } from 'zod'

import { CreateDepartmentUseCase } from '@/domain/admsjp/application/use-cases/departments/create-department'
import { DepartmentAlreadyExistsError } from '@/domain/admsjp/application/use-cases/departments/errors/department-already-exists-error'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const createDepartmentBodySchema = z.object({
  name: z.string(),
  description: z.string(),
})

type CreateDepartmentBodySchema = z.infer<typeof createDepartmentBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createDepartmentBodySchema)

@Controller('/departments')
export class CreateDepartmentController {
  constructor(private createDepartment: CreateDepartmentUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: CreateDepartmentBodySchema) {
    const { name, description } = body

    const result = await this.createDepartment.execute({
      name,
      description,
    })

    if (result.isError()) {
      const error = result.value

      switch (error.constructor) {
        case DepartmentAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
