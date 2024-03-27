import {
  BadRequestException,
  ConflictException,
  Controller,
  Get,
  Param,
} from '@nestjs/common'

import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error'
import { GetChurchDetailsUseCase } from '@/domain/admsjp/application/use-cases/churchs/get-church-details'

import { ChurchDetailsPresenter } from '../../presenters/church-details-presenter'

@Controller('/admsjp/churchs/:churchId')
export class GetChurchDetailsController {
  constructor(private getChurchDetails: GetChurchDetailsUseCase) {}

  @Get()
  async handle(@Param('churchId') churchId: string) {
    const result = await this.getChurchDetails.execute({
      churchId,
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

    const church = result.value.church

    return {
      church: ChurchDetailsPresenter.toHTTP(church),
    }
  }
}
