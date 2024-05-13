import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { z } from 'zod'

import { GetEventAddressByEventIdUseCase } from '@/domain/admsjp/use-cases/event-address/get/by-event-id/get-event-address-by-event-id'
import { Public } from '@/infra/auth/public'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

const paramsSchema = z.coerce.number().int().positive()
const paramValidationPipe = new ZodValidationPipe(paramsSchema)
type ParamSchema = z.infer<typeof paramsSchema>

@Controller('/event/:eventId')
@Public()
export class GetEventAddressByEventIdController {
  constructor(
    private getEventAddressByEventId: GetEventAddressByEventIdUseCase,
  ) {}

  @Get()
  async handle(@Param('eventId', paramValidationPipe) eventId: ParamSchema) {
    const result = await this.getEventAddressByEventId.execute({
      eventId,
    })

    if (result.isError()) {
      throw new BadRequestException()
    }

    return {
      eventAddress: result.value.eventAddress,
    }
  }
}
