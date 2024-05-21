import { BadRequestException, Controller, Get, Param } from '@nestjs/common'

import {
  ParamsSchema,
  paramsValidationPipe,
} from '@/core/schemas/params-schema'
import { GetAllInformationAboutEventTicketUseCase } from '@/domain/admsjp/use-cases/event-ticket/get-all-information-about-event-ticket'

@Controller('/:id')
export class GetAllInformationAboutEventTicketController {
  constructor(
    private getAllInformationAboutEventTicketUseCase: GetAllInformationAboutEventTicketUseCase,
  ) {}

  @Get()
  async handle(@Param('id', paramsValidationPipe) id: ParamsSchema) {
    const result = await this.getAllInformationAboutEventTicketUseCase.execute({
      eventTicketId: id,
    })

    if (result.isError()) {
      throw new BadRequestException()
    }

    const eventTicketDetails = result.value.eventTicketDetails

    return {
      eventTicketDetails,
    }
  }
}
