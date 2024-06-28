import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { z } from 'zod'

import { CreateProfileUseCase } from '@/domain/admsjp/use-cases/profile/create-profile'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const createProfileSchema = z.object({
  name: z.string(),
  visible: z.number().int().min(0).max(1).optional(),
  status: z.number().int().min(0).max(1).optional(),
})

type CreateProfileSchema = z.infer<typeof createProfileSchema>

const bodyValidationPipe = new ZodValidationPipe(createProfileSchema)

@Controller('/')
export class CreateProfileController {
  constructor(private createProfile: CreateProfileUseCase) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async handle(
    @Body(bodyValidationPipe) body: CreateProfileSchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { name, status, visible } = body

    const profile = await this.createProfile.execute({
      name,
      visible,
      status,
      createdBy: user.sub.id,
    })

    return profile
  }
}
