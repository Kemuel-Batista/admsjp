import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { SaveChurchDepartmentUseCase } from '@/domain/admsjp/application/use-cases/churchs/save-church-department'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const memberBodySchema = z.object({
  name: z.string(),
  functionName: z.string(),
  subFunction: z.string(),
  phone: z.string(),
  email: z.string(),
  birthday: z.string().transform((arg) => new Date(arg)),
})

const saveChurchDepartmentBodySchema = z.object({
  departmentId: z.string().uuid(),
  members: z.array(memberBodySchema),
})

type SaveChurchDepartmentBodySchema = z.infer<
  typeof saveChurchDepartmentBodySchema
>

const bodyValidationPipe = new ZodValidationPipe(saveChurchDepartmentBodySchema)

@Controller('/admsjp/churchs/:churchId/department')
export class SaveChurchDepartmentController {
  constructor(private saveChurchDepartment: SaveChurchDepartmentUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: SaveChurchDepartmentBodySchema,
    @Param('churchId') churchId: string,
  ) {
    const { departmentId, members } = body

    const result = await this.saveChurchDepartment.execute({
      churchId,
      departmentId,
      members,
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
