import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common'
import { Request } from 'express'
import { z } from 'zod'

import HttpStatusCode from '@/core/enums/HttpStatusCode'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { CreateProfileUseCase } from './create-profile'

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
  @HttpCode(HttpStatusCode.OK)
  async handle(
    @Body(bodyValidationPipe) body: CreateProfileSchema,
    @Req() request: Request,
  ) {
    const { name, status, visible } = body
    const { user } = request

    const profile = await this.createProfile.execute({
      name,
      visible,
      status,
      createdBy: user.id,
    })

    return profile
  }
}
