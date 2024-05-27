import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { z } from 'zod'

import { GetDepartmentByIdUseCase } from '@/domain/admsjp/use-cases/departments/get-department-by-id'
import { Public } from '@/infra/auth/public'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

const paramsSchema = z.coerce.number().int().positive()
const paramValidationPipe = new ZodValidationPipe(paramsSchema)
type ParamSchema = z.infer<typeof paramsSchema>

@Controller('/:id')
@Public()
export class GetDepartmentByIdController {
  constructor(private getDepartmentById: GetDepartmentByIdUseCase) {}

  @Get()
  async handle(@Param('id', paramValidationPipe) id: ParamSchema) {
    const result = await this.getDepartmentById.execute({
      id,
    })

    if (result.isError()) {
      throw new BadRequestException()
    }

    return {
      department: result.value.department,
    }
  }
}
