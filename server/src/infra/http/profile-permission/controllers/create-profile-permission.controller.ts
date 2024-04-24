import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { Response } from 'express'
import { z } from 'zod'

import HttpStatusCode from '@/core/enums/http-status-code'
import { CreateProfilePermissionUseCase } from '@/domain/admsjp/use-cases/profile-permission/create/create-profile-permission'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const createProfilePermissionSchema = z.object({
  key: z.string(),
  profileId: z.number().int().positive(),
})

type CreateProfilePermissionSchema = z.infer<
  typeof createProfilePermissionSchema
>

const bodyValidationPipe = new ZodValidationPipe(createProfilePermissionSchema)

@Controller('/')
export class CreateProfilePermissionController {
  constructor(
    private createProfilePermission: CreateProfilePermissionUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatusCode.CREATED)
  async handle(
    @Body(bodyValidationPipe) body: CreateProfilePermissionSchema,
    @CurrentUser() user: UserPayload,
    response: Response,
  ): Promise<Response> {
    const { key, profileId } = body

    const profilePermission = await this.createProfilePermission.execute({
      key,
      profileId,
      createdBy: user.sub.id,
    })

    return response.status(HttpStatusCode.OK).json(profilePermission)
  }
}
