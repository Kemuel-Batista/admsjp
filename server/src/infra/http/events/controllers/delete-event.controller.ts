import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common'
import { z } from 'zod'

import { UserProfile } from '@/domain/admsjp/enums/user'
import { DeleteEventUseCase } from '@/domain/admsjp/use-cases/events/delete-event'
import { ProfileGuard } from '@/infra/auth/profile.guard'
import { Profiles } from '@/infra/auth/profiles'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const DeleteEventParamsSchema = z.coerce.number().int().positive()

const paramValidationPipe = new ZodValidationPipe(DeleteEventParamsSchema)

type ParamSchema = z.infer<typeof DeleteEventParamsSchema>

@Controller('/:eventId')
export class DeleteEventController {
  constructor(private deleteEvent: DeleteEventUseCase) {}

  @Profiles(UserProfile.ADMINISTRADOR, UserProfile.EVENTS)
  @UseGuards(ProfileGuard)
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(@Param('eventId', paramValidationPipe) eventId: ParamSchema) {
    await this.deleteEvent.execute({
      id: eventId,
    })
  }
}
