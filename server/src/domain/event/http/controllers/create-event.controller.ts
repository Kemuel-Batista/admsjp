import {
  Body,
  Controller,
  FileTypeValidator,
  HttpCode,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Decimal } from '@prisma/client/runtime/library'
import { z } from 'zod'

import HttpStatusCode from '@/core/enums/HttpStatusCode'
import { UserProfile } from '@/domain/user/enums/user-profile'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ProfileGuard } from '@/infra/auth/profile.guard'
import { Profiles } from '@/infra/auth/profiles'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { CreateEventUseCase } from '../../use-cases/create/create-event'

const createEventSchema = z.object({
  title: z.string(),
  description: z.string(),
  value: z.coerce.number(),
  initialDate: z.string().transform((arg) => new Date(arg)),
  finalDate: z.string().transform((arg) => new Date(arg)),
  status: z.coerce.number().int().min(0).max(1).optional(),
  visible: z.coerce.number().int().min(0).max(1).optional(),
  eventType: z.coerce.number().min(0).max(20),
  departmentId: z.coerce.number().positive().min(1),
  street: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  neighborhood: z.string().optional(),
  state: z.coerce.number().positive().min(1).optional(),
  city: z.coerce.number().positive().min(1).optional(),
  latitude: z.coerce
    .number()
    .refine((value) => {
      return Math.abs(value) <= 90
    })
    .optional(),
  longitude: z.coerce
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

  @Profiles(UserProfile.ADMINISTRADOR, UserProfile.EVENTS)
  @UseGuards(ProfileGuard)
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
          new FileTypeValidator({ fileType: '.(png|jpg|jpeg|webp)' }),
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
      description,
      value,
      initialDate,
      finalDate,
      status,
      visible,
      eventType,
      departmentId,
      fileName: file.originalname,
      fileType: file.mimetype,
      body: file.buffer,
      street,
      number,
      complement,
      neighborhood,
      state,
      city,
      latitude: latitude === undefined ? undefined : new Decimal(latitude),
      longitude: longitude === undefined ? undefined : new Decimal(longitude),
      message,
      createdBy: user.sub.id,
    })

    return event
  }
}
