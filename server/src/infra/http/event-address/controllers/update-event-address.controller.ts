import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common'
import { Decimal } from '@prisma/client/runtime/library'
import { z } from 'zod'

import { UserProfile } from '@/domain/admsjp/enums/user'
import { EditEventAddressUseCase } from '@/domain/admsjp/use-cases/event-address/edit-event-address'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ProfileGuard } from '@/infra/auth/profile.guard'
import { Profiles } from '@/infra/auth/profiles'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const updateEventAddressSchema = z.object({
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
})

type UpdateEventAddressSchema = z.infer<typeof updateEventAddressSchema>

const bodyValidationPipe = new ZodValidationPipe(updateEventAddressSchema)

const UpdateEventAddressParamsSchema = z.coerce.number().int().positive()

const paramValidationPipe = new ZodValidationPipe(
  UpdateEventAddressParamsSchema,
)

type ParamSchema = z.infer<typeof UpdateEventAddressParamsSchema>

@Controller('/:id')
export class UpdateEventAddressController {
  constructor(private updateEventAddress: EditEventAddressUseCase) {}

  @Profiles(UserProfile.ADMINISTRADOR, UserProfile.EVENTS)
  @UseGuards(ProfileGuard)
  @Put()
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(
    @Body(bodyValidationPipe) body: UpdateEventAddressSchema,
    @Param('id', paramValidationPipe) id: ParamSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const {
      street,
      number,
      neighborhood,
      complement,
      state,
      city,
      latitude,
      longitude,
    } = body

    await this.updateEventAddress.execute({
      id,
      street,
      number,
      neighborhood,
      complement,
      state,
      city,
      latitude,
      longitude,
      updatedBy: user.sub.id,
    })
  }
}
