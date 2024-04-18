import { Controller, Delete, HttpCode, Param } from '@nestjs/common'
import { z } from 'zod'

import HttpStatusCode from '@/core/enums/HttpStatusCode'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { deleteProfilePermissionSchema } from '../../../schema/profile-permission-schema'
import { DeleteProfilePermissionByIdUseCase } from './delete-profile-permission-by-id'

const paramValidationPipe = new ZodValidationPipe(deleteProfilePermissionSchema)

type ParamSchema = z.infer<typeof deleteProfilePermissionSchema>

@Controller('/:id')
export class DeleteProfilePermissionByIdController {
  constructor(
    private deleteProfilePermissionById: DeleteProfilePermissionByIdUseCase,
  ) {}

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
