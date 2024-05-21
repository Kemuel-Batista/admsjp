import { EventTicket } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { EventTicketsRepository } from '../../repositories/event-tickets-repository'
import { OrdersRepository } from '../../repositories/orders-repository'
import { EventTicketWithAllInformation } from '../../types/event-ticket'

interface GetAllInformationAboutEventTicketUseCaseRequest {
  eventTicketId: EventTicket['id']
}

type GetAllInformationAboutEventTicketUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    eventTicketDetails: EventTicketWithAllInformation
  }
>

export class GetAllInformationAboutEventTicketUseCase {
  constructor(
    private eventTicketsRepository: EventTicketsRepository,
    private ordersRepository: OrdersRepository,
  ) {}

  async execute({
    eventTicketId,
  }: GetAllInformationAboutEventTicketUseCaseRequest): Promise<GetAllInformationAboutEventTicketUseCaseResponse> {
    const eventTicket =
      await this.eventTicketsRepository.findDetailsById(eventTicketId)

    if (!eventTicket) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'eventTicket.find.notFound',
          key: String(eventTicketId),
        }),
      )
    }

    const eventTicketOrders = await this.ordersRepository.listByTransactionId(
      eventTicket.id,
    )

    const eventTicketDetails = {
      ...eventTicket,
      orders: eventTicketOrders,
    }

    return success({
      eventTicketDetails,
    })
  }
}
