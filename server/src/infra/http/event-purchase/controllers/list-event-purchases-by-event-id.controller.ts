import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common'
import { z } from 'zod'

import { ListEventPurchasesByEventIdUseCase } from '@/domain/admsjp/use-cases/event-purchase/list-event-purchases-by-event-id'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

const queryParamsSchema = z.object({
  allRecords: z
    .string()
    .optional()
    .default('false')
    .transform((value) => value === 'true'),
  page: z.string().optional().transform(Number).pipe(z.number().min(1)),
  pageSize: z.string().optional().transform(Number).pipe(z.number().min(1)),
})

const queryValidationPipe = new ZodValidationPipe(queryParamsSchema)

type QueryParamsSchema = z.infer<typeof queryParamsSchema>

@Controller('/by-event/:eventId')
export class ListEventPurchasesByEventIdController {
  constructor(
    private listEventPurchasesByEventIdUseCase: ListEventPurchasesByEventIdUseCase,
  ) {}

  @Get()
  async handle(
    @Param('eventId') eventId: string,
    @Query(queryValidationPipe) query: QueryParamsSchema,
  ) {
    const result = await this.listEventPurchasesByEventIdUseCase.execute({
      eventId,
      options: query,
    })

    if (result.isError()) {
      throw new BadRequestException()
    }

    const { eventPurchases, count } = result.value

    return {
      eventPurchases,
      count,
    }
  }
}
