import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common'
import { z } from 'zod'

import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error'
import { CreateChurchUseCase } from '@/domain/admsjp/application/use-cases/churchs/create-church'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const createChurchBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  street: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  number: z.string(),
  latitude: z.number().refine((value) => {
    return Math.abs(value) <= 90
  }),
  longitude: z.number().refine((value) => {
    return Math.abs(value) <= 180
  }),
})

type CreateChurchBodySchema = z.infer<typeof createChurchBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createChurchBodySchema)

@Controller('/admsjp/churchs')
export class CreateChurchController {
  constructor(private createChurch: CreateChurchUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: CreateChurchBodySchema) {
    const {
      name,
      description,
      street,
      neighborhood,
      city,
      state,
      postalCode,
      number,
      latitude,
      longitude,
    } = body

    const result = await this.createChurch.execute({
      name,
      description,
      street,
      neighborhood,
      city,
      state,
      postalCode,
      number,
      latitude,
      longitude,
    })

    if (result.isError()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
