import { BadRequestException, Controller, Get, Query } from '@nestjs/common'
import { z } from 'zod'

import { ListEventTicketsOnlyWithShirtsUseCase } from '@/domain/admsjp/use-cases/event-ticket/list-event-tickets-only-with-shirts'

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

@Controller('/shirts')
export class ListEventTicketsOnlyWithShirtsController {
  constructor(
    private listEventTicketsOnlyWithShirts: ListEventTicketsOnlyWithShirtsUseCase,
  ) {}

  @Get()
  async handle(@Query(queryValidationPipe) options: QueryParamsSchema) {
    const result = await this.listEventTicketsOnlyWithShirts.execute({
      options,
    })

    if (result.isError()) {
      throw new BadRequestException()
    }

    const { eventTickets, count } = result.value

    return {
      eventTickets,
      count,
    }
  }
}
