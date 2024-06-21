import { Injectable } from '@nestjs/common'
import { Order, User } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { IncorrectAssociationError } from '@/core/errors/errors/incorrect-association-error'
import { InvalidAttachmentTypeError } from '@/core/errors/errors/invalid-attachment-type-error'
import { OrderPaymentAlreadyCompletedError } from '@/core/errors/errors/order-payment-already-completed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { OrderPaymentMethod, OrderStatus } from '../../enums/order'
import { EventTicketsRepository } from '../../repositories/event-tickets-repository'
import { OrdersRepository } from '../../repositories/orders-repository'
import { Uploader } from '../../storage/uploader'

interface CreateManualOrderPaymentUseCaseRequest {
  transactionId: Order['transactionId']
  fileName: string
  fileType: string
  body: Buffer
  paidBy: User['id']
}

type CreateManualOrderPaymentUseCaseResponse = Either<
  | InvalidAttachmentTypeError
  | ResourceNotFoundError
  | IncorrectAssociationError
  | OrderPaymentAlreadyCompletedError,
  null
>

@Injectable()
export class CreateManualOrderPaymentUseCase {
  constructor(
    private ordersRepository: OrdersRepository,
    private eventTicketsRepository: EventTicketsRepository,
    private uploader: Uploader,
  ) {}

  async execute({
    transactionId,
    fileName,
    fileType,
    body,
    paidBy,
  }: CreateManualOrderPaymentUseCaseRequest): Promise<CreateManualOrderPaymentUseCaseResponse> {
    if (
      !/^(image\/(jpeg|png|webp))$|^application\/pdf$|^video\/mp4$/.test(
        fileType,
      )
    ) {
      return failure(
        new InvalidAttachmentTypeError({
          errorKey: 'order.create.invalidAttachmentType',
          key: fileType,
        }),
      )
    }

    const eventTicket =
      await this.eventTicketsRepository.findById(transactionId)

    if (!eventTicket) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'eventTicket.find.notFound',
          key: transactionId.toString(),
        }),
      )
    }

    if (eventTicket.createdBy !== paidBy) {
      return failure(
        new IncorrectAssociationError({
          errorKey: 'order.payment.ticketOwnerIsNotSame',
          key: paidBy.toString(),
        }),
      )
    }

    if (eventTicket.expiresAt === null) {
      return failure(
        new OrderPaymentAlreadyCompletedError({
          errorKey: 'order.payment.alreadyCompleted',
          key: transactionId.toString(),
        }),
      )
    }

    const { url } = await this.uploader.upload({
      fileName,
      fileType,
      body,
    })

    await this.ordersRepository.create({
      transactionId,
      status: OrderStatus.WAITING_CONFIRMATION,
      paymentMethod: OrderPaymentMethod.MANUAL,
      attachment: url,
    })

    eventTicket.expiresAt = null

    await this.eventTicketsRepository.update(eventTicket)

    return success(null)
  }
}
