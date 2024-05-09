/*
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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Decimal } from '@prisma/client/runtime/library'
import { z } from 'zod'

import { UserProfile } from '@/domain/admsjp/enums/user'
import { UpdateEventUseCase } from '@/domain/admsjp/use-cases/events/update/default/update-event'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ProfileGuard } from '@/infra/auth/profile.guard'
import { Profiles } from '@/infra/auth/profiles'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const updateEventSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  value: z.coerce.number().optional(),
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
  departmentId: z.coerce.number().positive().min(1).optional(),
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

type UpdateEventSchema = z.infer<typeof updateEventSchema>

const bodyValidationPipe = new ZodValidationPipe(updateEventSchema)

const UpdateEventParamsSchema = z.coerce.number().int().positive()

const paramValidationPipe = new ZodValidationPipe(UpdateEventParamsSchema)

type ParamSchema = z.infer<typeof UpdateEventParamsSchema>

@Controller('/:eventId')
export class UpdateEventController {
  constructor(private updateEvent: UpdateEventUseCase) {}

  @Profiles(UserProfile.ADMINISTRADOR, UserProfile.EVENTS)
  @UseGuards(ProfileGuard)
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
    @Body(bodyValidationPipe) body: UpdateEventSchema,
    @Param('eventId', paramValidationPipe) eventId: ParamSchema,
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

    const event = await this.updateEvent.execute({
      id: eventId,
      title,
      description,
      initialDate,
      finalDate,
      status,
      visible,
      eventType,
      departmentId,
      fileName: file === undefined ? undefined : file.originalname,
      fileType: file === undefined ? undefined : file.mimetype,
      body: file === undefined ? undefined : file.buffer,
      message,
      updatedBy: user.sub.id,
    })

    return event
  }
}
*/

import { Controller } from '@nestjs/common'

import { UpdateEventUseCase } from '@/domain/admsjp/use-cases/events/update/default/update-event'

@Controller('/:eventId')
export class UpdateEventController {
  constructor(private updateEvent: UpdateEventUseCase) {}
}
