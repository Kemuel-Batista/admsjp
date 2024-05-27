import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { z } from 'zod'

import { GetEventByIdUseCase } from '@/domain/admsjp/use-cases/events/get-event-by-id'
import { Public } from '@/infra/auth/public'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

const paramsSchema = z.coerce.number().int().positive()
const paramValidationPipe = new ZodValidationPipe(paramsSchema)
type ParamSchema = z.infer<typeof paramsSchema>

@Controller('/:id')
@Public()
export class GetEventByIdController {
  constructor(private getEventById: GetEventByIdUseCase) {}

  @Get()
  async handle(@Param('id', paramValidationPipe) id: ParamSchema) {
    const result = await this.getEventById.execute({
      id,
    })

    if (result.isError()) {
      throw new BadRequestException()
    }

    return {
      event: result.value.event,
    }
  }
}
