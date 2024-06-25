import {
  BadRequestException,
  Controller,
  FileTypeValidator,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  NotFoundException,
  Param,
  ParseFilePipe,
  Post,
  PreconditionFailedException,
  UnsupportedMediaTypeException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

import { IncorrectAssociationError } from '@/core/errors/errors/incorrect-association-error'
import { InvalidAttachmentTypeError } from '@/core/errors/errors/invalid-attachment-type-error'
import { OrderPaymentAlreadyCompletedError } from '@/core/errors/errors/order-payment-already-completed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { CreateManualOrderPaymentUseCase } from '@/domain/admsjp/use-cases/orders/create-manual-order-payment'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'

@Controller('/manual/:transactionId')
export class CreateManualOrderPaymentController {
  constructor(
    private createManualOrderPayment: CreateManualOrderPaymentUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file'))
  async handle(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 5, // 5mb
          }),
          new FileTypeValidator({ fileType: '.(png|jpg|jpeg|webp)' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('transactionId') transactionId: string,
    @CurrentUser() user: UserPayload,
  ) {
    const result = await this.createManualOrderPayment.execute({
      transactionId,
      fileName: file.originalname,
      fileType: file.mimetype,
      body: file.buffer,
      paidBy: user.sub.id,
    })

    if (result.isError()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        case InvalidAttachmentTypeError:
          throw new UnsupportedMediaTypeException(error.message)
        case IncorrectAssociationError:
          throw new PreconditionFailedException(error.message)
        case OrderPaymentAlreadyCompletedError:
          throw new PreconditionFailedException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
