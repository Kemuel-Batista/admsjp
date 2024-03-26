import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { z } from 'zod'

import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error'
import { EditChurchUseCase } from '@/domain/admsjp/application/use-cases/churchs/edit-church'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const editChurchBodySchema = z.object({
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

type EditChurchBodySchema = z.infer<typeof editChurchBodySchema>

const bodyValidationPipe = new ZodValidationPipe(editChurchBodySchema)

@Controller('/admsjp/churchs/:churchId')
export class EditChurchController {
  constructor(private editChurch: EditChurchUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditChurchBodySchema,
    @Param('churchId') churchId: string,
  ) {
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

    const result = await this.editChurch.execute({
      churchId,
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
