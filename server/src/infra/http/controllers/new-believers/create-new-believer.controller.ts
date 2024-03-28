import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  NotFoundException,
  Post,
} from '@nestjs/common'
import { z } from 'zod'

import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { CreateNewBelieverUseCase } from '@/domain/admsjp/application/use-cases/new-believers/create-new-believer'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const createNewBelieverBodySchema = z.object({
  churchId: z.string().uuid(),
  name: z.string(),
  lastName: z.string(),
  phone: z.string(),
  email: z.string().email().optional(),
  birthday: z.string().transform((arg) => new Date(arg)),
  street: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  number: z.string(),
  lgpd: z.boolean(),
})

type CreateNewBelieverBodySchema = z.infer<typeof createNewBelieverBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createNewBelieverBodySchema)

@Controller('/admsjp/believer')
export class CreateNewBelieverController {
  constructor(private createNewBeliever: CreateNewBelieverUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body(bodyValidationPipe) body: CreateNewBelieverBodySchema) {
    const {
      churchId,
      name,
      lastName,
      phone,
      email,
      birthday,
      street,
      neighborhood,
      city,
      state,
      postalCode,
      number,
      lgpd,
    } = body

    const result = await this.createNewBeliever.execute({
      churchId,
      name,
      lastName,
      phone,
      email,
      birthday,
      street,
      neighborhood,
      city,
      state,
      postalCode,
      number,
      lgpd,
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
  }
}
