import { Body, Controller, HttpCode, HttpStatus, Put } from '@nestjs/common'
import { z } from 'zod'

import { EditEventLotUseCase } from '@/domain/admsjp/use-cases/event-lot/edit-event-lot'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const editEventLotSchema = z.object({
  id: z.string().uuid(),
  eventId: z.string().uuid(),
  lot: z.number().int().positive(),
  quantity: z.number().int().positive(),
  value: z.number().int().positive(),
  status: z.number().int().positive(),
})

type EditEventLotSchema = z.infer<typeof editEventLotSchema>

const bodyValidationPipe = new ZodValidationPipe(editEventLotSchema)

@Controller('/')
export class EditEventLotController {
  constructor(private editEventLot: EditEventLotUseCase) {}

  @Put()
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(@Body(bodyValidationPipe) body: EditEventLotSchema) {
    const { id, eventId, lot, quantity, status, value } = body

    await this.editEventLot.execute({
      id,
      eventId,
      lot,
      quantity,
      status,
      value,
    })
  }
}
