import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { z } from 'zod'

import { RegisterEventQueue } from '@/domain/admsjp/use-cases/queues/register-event-queue'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

const createEventPurchaseSchema = z.object({
  eventId: z.number().int().positive(),
  eventLotInfo: z.array(
    z.object({
      eventLotId: z.string().uuid(),
      quantity: z.number().int().positive(),
    }),
  ),
})

type CreateEventPurchaseSchema = z.infer<typeof createEventPurchaseSchema>

const bodyValidationPipe = new ZodValidationPipe(createEventPurchaseSchema)

@Controller('/')
export class CreateEventPurchaseController {
  constructor(private registerEventQueue: RegisterEventQueue) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(
    @Body(bodyValidationPipe) body: CreateEventPurchaseSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { eventId, eventLotInfo } = body

    await this.registerEventQueue.execute({
      eventId,
      buyerId: user.sub.id,
      eventLotInfo,
    })
  }
}
