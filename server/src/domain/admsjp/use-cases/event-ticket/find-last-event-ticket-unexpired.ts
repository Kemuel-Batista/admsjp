import { Injectable } from '@nestjs/common'
import { EventTicket } from '@prisma/client'

import { Either, failure } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { i18n } from '@/core/i18n/i18n'

import { EventTicketsRepository } from '../../repositories/event-tickets-repository'
import { ParametersRepository } from '../../repositories/parameters-repository'
import { EventSocket } from '../../websocket/event-socket'

interface FindLastEventTicketUnexpiredUseCaseRequest {
  userId: EventTicket['userId']
}

type FindLastEventTicketUnexpiredUseCaseResponse = Either<
  ResourceNotFoundError,
  void
>

@Injectable()
export class FindLastEventTicketUnexpiredUseCase {
  constructor(
    private eventTicketsRepository: EventTicketsRepository,
    private parametersRepository: ParametersRepository,
    private eventSocket: EventSocket,
  ) {}

  async execute({
    userId,
  }: FindLastEventTicketUnexpiredUseCaseRequest): Promise<FindLastEventTicketUnexpiredUseCaseResponse> {
    const orderPaymentType =
      await this.parametersRepository.findByKey('order.payment.type')

    if (!orderPaymentType) {
      await this.eventSocket.emit({
        to: `purchase:${userId}`,
        event: 'order-processing-error',
        data: {
          errorMessage: i18n.t('parameter.find.notFound'),
        },
      })

      return failure(
        new ResourceNotFoundError({
          errorKey: 'parameter.find.notFound',
          key: 'order.payment.type',
        }),
      )
    }

    const eventTicket =
      await this.eventTicketsRepository.findFirstLastUnexpiredByUserId(userId)

    if (eventTicket) {
      const data = {
        eventTicketId: eventTicket.id,
        orderPaymentType: orderPaymentType.value,
      }

      await this.eventSocket.emit({
        to: `purchase:${userId}`,
        event: 'order-processing-completed',
        data,
      })
    }
  }
}
