export abstract class TicketGenerator {
  abstract generate(type: string, lastTicket: string | null): Promise<string>
}
