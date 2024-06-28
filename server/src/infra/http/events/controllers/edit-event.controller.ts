import {
  Body,
  Controller,
  FileTypeValidator,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { z } from 'zod'

import { EditEventUseCase } from '@/domain/admsjp/use-cases/events/edit-event'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const editEventSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  initialDate: z
    .string()
    .optional()
    .transform((arg) => new Date(arg)),
  finalDate: z
    .string()
    .optional()
    .transform((arg) => new Date(arg)),
  status: z.coerce.number().int().min(0).max(1).optional(),
  visible: z.coerce.number().int().min(0).max(1).optional(),
  eventType: z.coerce.number().min(0).max(20).optional(),
  message: z.string().optional(),
})

type EditEventSchema = z.infer<typeof editEventSchema>

const bodyValidationPipe = new ZodValidationPipe(editEventSchema)

const EditEventParamsSchema = z.string().uuid()

const paramValidationPipe = new ZodValidationPipe(EditEventParamsSchema)

type ParamSchema = z.infer<typeof EditEventParamsSchema>

@Controller('/:eventId')
export class EditEventController {
  constructor(private editEvent: EditEventUseCase) {}

  @Put()
  @HttpCode(HttpStatus.NO_CONTENT)
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
        fileIsRequired: false,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    )
    file: Express.Multer.File | undefined,
    @Body(bodyValidationPipe) body: EditEventSchema,
    @Param('eventId', paramValidationPipe) eventId: ParamSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const {
      title,
      description,
      initialDate,
      finalDate,
      status,
      visible,
      eventType,
      message,
    } = body

    await this.editEvent.execute({
      id: eventId,
      title,
      description,
      initialDate,
      finalDate,
      status,
      visible,
      eventType,
      fileName: file === undefined ? undefined : file.originalname,
      fileType: file === undefined ? undefined : file.mimetype,
      body: file === undefined ? undefined : file.buffer,
      message,
      updatedBy: user.sub.id,
    })
  }
}
