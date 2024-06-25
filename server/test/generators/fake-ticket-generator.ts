import { TicketGenerator } from '@/domain/admsjp/generators/ticket-generator'

export class FakeTicketGenerator implements TicketGenerator {
  async generate(type: string, lastTicket: string): Promise<string> {
    const now = new Date()
    const year = now.getFullYear()
    const month = (now.getMonth() + 1).toString().padStart(2, '0')
    const day = now.getDate().toString().padStart(2, '0')

    let count: number

    if (lastTicket !== '') {
      const splitTicket = lastTicket.split(type)
      const countPart = splitTicket[1]
      if (countPart) {
        count = parseInt(countPart) + 1
      } else {
        count = 1
      }
    } else {
      count = 1
    }

    const ticket = `${year}${month}${day}${type}${count.toString().padStart(4, '0')}`

    return ticket
  }
}
