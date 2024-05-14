import { EventTicket, Prisma } from '@prisma/client'

export abstract class EventTicketsRepository {
  abstract create(
    data: Prisma.EventTicketUncheckedCreateInput,
  ): Promise<EventTicket>

  abstract lastTicket(): Promise<string>
}
