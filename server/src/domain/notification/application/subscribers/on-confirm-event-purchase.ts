import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { EventPurchase } from '@prisma/client'
import handlebars from 'handlebars'

import { Either, success } from '@/core/either'
import { maskCurrency } from '@/core/util/masks/mask-currency'
import { QRCodeGenerator } from '@/domain/admsjp/generators/qr-code-generator'
import { EventLotsRepository } from '@/domain/admsjp/repositories/event-lots-repository'
import { EventTicketsRepository } from '@/domain/admsjp/repositories/event-tickets-repository'
import { UsersRepository } from '@/domain/admsjp/repositories/users-repository'

import { MailNotifier } from '../notifiers/mail-notifier'
import { SendNotificationUseCase } from '../use-cases/send-notification'

interface OnConfirmEventPurchaseRequest {
  purchase: EventPurchase
}

type OnConfirmEventPurchaseResponse = Either<null, null>

type TicketInfo = {
  name: string
  email: string
  phone: string
  shirtSize: string
  qrCode: string
}

export class OnConfirmEventPurchase {
  constructor(
    private eventTicketsRepository: EventTicketsRepository,
    private eventLotsRepository: EventLotsRepository,
    private usersRepository: UsersRepository,
    private qrCodeGenerator: QRCodeGenerator,
    private sendNotification: SendNotificationUseCase,
    private mailNotifier: MailNotifier,
  ) {}

  async execute({
    purchase,
  }: OnConfirmEventPurchaseRequest): Promise<OnConfirmEventPurchaseResponse> {
    const user = await this.usersRepository.findById(purchase.buyerId)

    const eventTicketsByPurchase =
      await this.eventTicketsRepository.listByEventPurchaseId(purchase.id)

    const ticketsInfo: TicketInfo[] = []
    let totalValue: number = 0

    for (const eventTicket of eventTicketsByPurchase) {
      const link = `${process.env.APP_BASE_URL}/ticket/details/${eventTicket.ticket}`

      const qrCodeBuffer = await this.qrCodeGenerator.generate(link)

      const qrCodeBase64 = Buffer.from(qrCodeBuffer).toString()

      const eventLot = await this.eventLotsRepository.findById(
        eventTicket.eventLotId,
      )

      totalValue += eventLot.value

      ticketsInfo.push({
        name: eventTicket.name,
        phone: eventTicket.phone,
        shirtSize: eventTicket.shirtSize ?? '',
        email: eventTicket.email,
        qrCode: qrCodeBase64,
      })
    }

    await this.sendNotification.execute({
      recipientId: purchase.buyerId,
      title: 'Inscrição EBJ confirmada!',
      content: `Inscrição EBJ confirmada! Ticket: "${purchase.invoiceNumber}"`,
    })

    const htmlPath = join(__dirname, '..', 'views', 'manager-created.hbs')
    const templateHtml = readFileSync(htmlPath, 'utf-8')

    const compiledTemplate = handlebars.compile(templateHtml)

    const renderedHtml = compiledTemplate(
      {
        invoiceNumber: purchase.invoiceNumber,
        buyerEmail: user.email,
        createdAt: purchase.createdAt.toLocaleDateString(),
        totalValue: maskCurrency(String(totalValue)),
        ticketsInfo,
      },
      {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
        allowedProtoProperties: {
          name: true,
          phone: true,
          shirtSize: true,
          email: true,
          qrCode: true,
        },
      },
    )

    await this.mailNotifier.send({
      email: user.email,
      title: 'Inscrição EBJ confirmada!',
      content: `Inscrição EBJ confirmada! Ticket: "${purchase.invoiceNumber}"`,
      renderedHtml,
    })

    return success(null)
  }
}
