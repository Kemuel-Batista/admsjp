import { Controller, Delete, HttpCode, Param, UseGuards } from '@nestjs/common'
import { z } from 'zod'

import HttpStatusCode from '@/core/enums/http-status-code'
import { UserProfile } from '@/domain/admsjp/enums/user'
import { DeleteProfilePermissionByIdUseCase } from '@/domain/admsjp/use-cases/profile-permission/delete/by-id/delete-profile-permission-by-id'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ProfileGuard } from '@/infra/auth/profile.guard'
import { Profiles } from '@/infra/auth/profiles'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const deleteProfilePermissionSchema = z.coerce.number().int().positive()

const paramValidationPipe = new ZodValidationPipe(deleteProfilePermissionSchema)

type ParamSchema = z.infer<typeof deleteProfilePermissionSchema>

@Controller('/:id')
export class DeleteProfilePermissionByIdController {
  constructor(
    private deleteProfilePermissionById: DeleteProfilePermissionByIdUseCase,
  ) {}

  @Profiles(UserProfile.ADMINISTRADOR)
  @UseGuards(ProfileGuard)
  @Delete()
  @HttpCode(HttpStatusCode.OK)
  async handle(
    @Param('id', paramValidationPipe) id: ParamSchema,
    @CurrentUser() user: UserPayload,
  ) {
    await this.deleteProfilePermissionById.execute({
      id,
      deletedBy: user.sub.id,
    })
  }
}
