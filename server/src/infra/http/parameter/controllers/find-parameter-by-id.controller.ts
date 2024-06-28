import { Controller, Get, Param } from '@nestjs/common'
import { z } from 'zod'

import { FindParameterByIdUseCase } from '@/domain/admsjp/use-cases/parameters/find-parameter-by-id'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

const findParameterParamSchema = z.string().uuid()
const paramValidationPipe = new ZodValidationPipe(findParameterParamSchema)
type ParamSchema = z.infer<typeof findParameterParamSchema>

@Controller('/:id')
export class FindParameterByIdController {
  constructor(private findParameterById: FindParameterByIdUseCase) {}

  @Get()
  async handle(@Param('id', paramValidationPipe) id: ParamSchema) {
    const parameter = await this.findParameterById.execute({
      id,
    })

    return {
      parameter,
    }
  }
}
