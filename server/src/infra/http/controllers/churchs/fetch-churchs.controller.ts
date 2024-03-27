import { Controller, Get, Query } from '@nestjs/common'
import { z } from 'zod'

import { FetchChurchsUseCase } from '@/domain/admsjp/application/use-cases/churchs/fetch-churchs'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

import { ChurchPresenter } from '../../presenters/church-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

@Controller('/churchs')
export class FetchChurchsController {
  constructor(private fetchChurchs: FetchChurchsUseCase) {}

  @Get()
  async handle(@Query('page', queryValidationPipe) page: PageQueryParamSchema) {
    const result = await this.fetchChurchs.execute({
      page,
    })

    const churchs = result.value.churchs

    return {
      churchs: churchs.map(ChurchPresenter.toHTTP),
    }
  }
}
