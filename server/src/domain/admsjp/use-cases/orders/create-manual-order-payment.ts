import { Order } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { InvalidAttachmentTypeError } from '@/core/errors/errors/invalid-attachment-type-error'
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
}

type CreateManualOrderPaymentUseCaseResponse = Either<
  InvalidAttachmentTypeError | ResourceNotFoundError,
  null
>

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

    return success(null)
  }
}
