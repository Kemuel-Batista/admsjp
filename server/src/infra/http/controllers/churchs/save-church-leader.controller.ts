import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { SaveChurchLeaderUseCase } from '@/domain/admsjp/application/use-cases/churchs/save-church-leader'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

const leaderBodySchema = z.object({
  name: z.string(),
  functionName: z.string(),
  phone: z.string(),
  email: z.string(),
  birthday: z.string().transform((arg) => new Date(arg)),
})

const saveChurchLeaderBodySchema = z.object({
  leaders: z.array(leaderBodySchema),
})

type SaveChurchLeaderBodySchema = z.infer<typeof saveChurchLeaderBodySchema>

const bodyValidationPipe = new ZodValidationPipe(saveChurchLeaderBodySchema)

@Controller('/admsjp/churchs/leaders/:churchId')
export class SaveChurchLeaderController {
  constructor(private saveChurchLeader: SaveChurchLeaderUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: SaveChurchLeaderBodySchema,
    @Param('churchId') churchId: string,
  ) {
    const { leaders } = body

    const result = await this.saveChurchLeader.execute({
      churchId,
      leaders,
    })

    if (result.isError()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
