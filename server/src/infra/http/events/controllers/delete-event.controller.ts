import { Controller, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common'
import { z } from 'zod'

import { DeleteEventUseCase } from '@/domain/admsjp/use-cases/events/delete-event'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const DeleteEventParamsSchema = z.string().uuid()

const paramValidationPipe = new ZodValidationPipe(DeleteEventParamsSchema)

type ParamSchema = z.infer<typeof DeleteEventParamsSchema>

@Controller('/:eventId')
export class DeleteEventController {
  constructor(private deleteEvent: DeleteEventUseCase) {}

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(@Param('eventId', paramValidationPipe) eventId: ParamSchema) {
    await this.deleteEvent.execute({
      id: eventId,
    })
  }
}
