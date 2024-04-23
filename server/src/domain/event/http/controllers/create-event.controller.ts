import {
  Body,
  Controller,
  FileTypeValidator,
  HttpCode,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Decimal } from '@prisma/client/runtime/library'
import { z } from 'zod'

import HttpStatusCode from '@/core/enums/HttpStatusCode'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { CreateEventUseCase } from '../../use-cases/create/create-event'

const createEventSchema = z.object({
  title: z.string(),
  description: z.string(),
  value: z.number(),
  initialDate: z.date(),
  finalDate: z.date(),
  status: z.number().int().min(0).max(1).optional(),
  visible: z.number().int().min(0).max(1).optional(),
  eventType,
  departmentId: z.number().positive().min(1),
  street: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  neighborhood: z.string().optional(),
  state: z.number().positive().min(1).optional(),
  city: z.number().positive().min(1).optional(),
  latitude: z
    .number()
    .refine((value) => {
      return Math.abs(value) <= 90
    })
    .optional(),
  longitude: z
    .number()
    .refine((value) => {
      return Math.abs(value) <= 180
    })
    .optional(),
  message: z.string().optional(),
})

type CreateEventSchema = z.infer<typeof createEventSchema>

const bodyValidationPipe = new ZodValidationPipe(createEventSchema)

@Controller('/')
export class CreateEventController {
  constructor(private createEvent: CreateEventUseCase) {}

  @Post()
  @HttpCode(HttpStatusCode.OK)
  @UseInterceptors(FileInterceptor('file'))
  async handle(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 1024 * 1024 * 5, // 5mb
          }),
          new FileTypeValidator({ fileType: '.(png|jpg|jpeg)' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body(bodyValidationPipe) body: CreateEventSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const {
      title,
      description,
      value,
      initialDate,
      finalDate,
      status,
      visible,
      eventType,
      departmentId,
      imagePath,
      street,
      number,
      complement,
      neighborhood,
      state,
      city,
      latitude,
      longitude,
      message,
    } = body

    const event = await this.createEvent.execute({
      title,
      slug: '',
      description,
      value,
      initialDate,
      finalDate,
      status,
      visible,
      eventType,
      departmentId,
      imagePath,
      street,
      number,
      complement,
      neighborhood,
      state,
      city,
      latitude: new Decimal(latitude),
      longitude: new Decimal(longitude),
      message,
      createdBy: user.sub.id,
    })

    return event
  }
}
