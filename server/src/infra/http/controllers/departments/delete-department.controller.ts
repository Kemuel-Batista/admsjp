import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { DeleteDepartmentUseCase } from '@/domain/use-cases/departments/delete-department'
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common'

@Controller('/departments/:departmentId')
export class DeleteDepartmentController {
  constructor(private deleteDepartment: DeleteDepartmentUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('departmentId') departmentId: string) {
    const result = await this.deleteDepartment.execute({
      departmentId,
    })

    if (result.isError()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
