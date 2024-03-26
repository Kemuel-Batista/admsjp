import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { EditDepartmentUseCase } from '@/domain/admsjp/application/use-cases/departments/edit-department'
import { DepartmentAlreadyExistsError } from '@/domain/admsjp/application/use-cases/departments/errors/department-already-exists-error'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const editDepartmentBodySchema = z.object({
  name: z.string(),
  description: z.string(),
})

type EditDepartmentBodySchema = z.infer<typeof editDepartmentBodySchema>

const bodyValidationPipe = new ZodValidationPipe(editDepartmentBodySchema)

@Controller('/departments/:departmentId')
export class EditDepartmentController {
  constructor(private editDepartment: EditDepartmentUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditDepartmentBodySchema,
    @Param('departmentId') departmentId: string,
  ) {
    const { name, description } = body

    const result = await this.editDepartment.execute({
      departmentId,
      name,
      description,
    })

    if (result.isError()) {
      const error = result.value

      switch (error.constructor) {
        case DepartmentAlreadyExistsError:
          throw new ConflictException(error.message)
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
