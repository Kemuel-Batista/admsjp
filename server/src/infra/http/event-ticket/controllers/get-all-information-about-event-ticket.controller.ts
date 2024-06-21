import { BadRequestException, Controller, Get, Param } from '@nestjs/common'

import { GetAllInformationAboutEventTicketUseCase } from '@/domain/admsjp/use-cases/event-ticket/get-all-information-about-event-ticket'

@Controller('/:id')
export class GetAllInformationAboutEventTicketController {
  constructor(
    private getAllInformationAboutEventTicketUseCase: GetAllInformationAboutEventTicketUseCase,
  ) {}

  @Get()
  async handle(@Param('id') id: string) {
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
