import { Controller, Get, Query } from '@nestjs/common'
import { z } from 'zod'

import { FetchDepartmentsUseCase } from '@/domain/admsjp/application/use-cases/departments/fetch-departments'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { DepartmentPresenter } from '../../presenters/department-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/departments')
export class FetchDepartmentsController {
  constructor(private fetchDepartments: FetchDepartmentsUseCase) {}

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
    const result = await this.fetchDepartments.execute({
      page,
    })

    const departments = result.value.departments

    return {
      departments: departments.map(DepartmentPresenter.toHTTP),
    }
  }
}
