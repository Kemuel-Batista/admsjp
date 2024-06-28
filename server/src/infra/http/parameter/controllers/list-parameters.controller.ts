import { BadRequestException, Controller, Get } from '@nestjs/common'

import { ListParametersUseCase } from '@/domain/admsjp/use-cases/parameters/list-parameters'

@Controller('/')
export class ListParametersController {
  constructor(private listParametersUseCase: ListParametersUseCase) {}

  @Get()
  async handle() {
    const result = await this.listParametersUseCase.execute({})

    if (result.isError()) {
      throw new BadRequestException()
    }

    const parameters = result.value

    return {
      parameters,
    }
  }
}
