import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  FileTypeValidator,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  NotFoundException,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Decimal } from '@prisma/client/runtime/library'
import { z } from 'zod'

import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { UserProfile } from '@/domain/admsjp/enums/user'
import { CreateEventUseCase } from '@/domain/admsjp/use-cases/events/create-event'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ProfileGuard } from '@/infra/auth/profile.guard'
import { Profiles } from '@/infra/auth/profiles'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const createEventLotSchema = z
  .object({
    name: z.string(),
    description: z.string(),
    quantity: z.number().int().positive(),
    lot: z.number().int().positive(),
    value: z.number().int().positive(),
    status: z.number().min(0).max(1),
  })
  .array()

const createEventSchema = z.object({
  title: z.string(),
  description: z.string(),
  initialDate: z.string().transform((arg) => new Date(arg)),
  finalDate: z.string().transform((arg) => new Date(arg)),
  status: z.coerce.number().int().min(0).max(1).optional(),
  visible: z.coerce.number().int().min(0).max(1).optional(),
  eventType: z.coerce.number().min(0).max(20),
  departmentId: z.coerce.number().positive().min(1),
  message: z.string().optional(),
  lots: z
    .string()
    .refine(
      (str) => {
        try {
          const parsedArray = JSON.parse(str)
          createEventLotSchema.parse(parsedArray)
          return Array.isArray(parsedArray)
        } catch (error) {
          return false
        }
      },
      { message: 'Invalid lots array format' },
    )
    .transform((str) => JSON.parse(str)),
  street: z.string().optional(),
  neighborhood: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  state: z.coerce.number().positive().min(1).optional(),
  city: z.coerce.number().positive().min(1).optional(),
  latitude: z.coerce
    .number()
    .refine((value) => {
      return Math.abs(value) <= 90
    })
    .transform((arg) => new Decimal(arg))
    .optional(),
  longitude: z.coerce
    .number()
    .refine((value) => {
      return Math.abs(value) <= 180
    })
    .transform((arg) => new Decimal(arg))
    .optional(),
  pixKey: z.string(),
  pixType: z.number().int().positive(),
})

type CreateEventSchema = z.infer<typeof createEventSchema>

const bodyValidationPipe = new ZodValidationPipe(createEventSchema)

@Controller('/')
export class CreateEventController {
  constructor(private createEvent: CreateEventUseCase) {}

  @Profiles(UserProfile.ADMINISTRADOR, UserProfile.EVENTS)
  @UseGuards(ProfileGuard)
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
    @Body(bodyValidationPipe) body: CreateEventSchema,
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
      departmentId,
      message,
      lots,
      street,
      neighborhood,
      number,
      complement,
      state,
      city,
      latitude,
      longitude,
      pixKey,
      pixType,
    } = body

    const result = await this.createEvent.execute({
      title,
      description,
      initialDate,
      finalDate,
      status,
      visible,
      eventType,
      departmentId,
      fileName: file.originalname,
      fileType: file.mimetype,
      body: file.buffer,
      message,
      lots,
      address: {
        street,
        neighborhood,
        number,
        complement,
        state,
        city,
        latitude,
        longitude,
      },
      imagePath: '',
      slug: '',
      pixKey,
      pixType,
      createdBy: user.sub.id,
    })

    if (result.isError()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        case ResourceAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const event = result.value.event

    return event
  }
}
