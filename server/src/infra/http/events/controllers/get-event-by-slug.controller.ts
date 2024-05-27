import { BadRequestException, Controller, Get, Param } from '@nestjs/common'

import { GetEventBySlugUseCase } from '@/domain/admsjp/use-cases/events/get-event-by-slug'
import { Public } from '@/infra/auth/public'

@Controller('/slug/:slug')
@Public()
export class GetEventBySlugController {
  constructor(private getEventBySlug: GetEventBySlugUseCase) {}

  @Get()
  async handle(@Param('slug') slug: string) {
    const result = await this.getEventBySlug.execute({
      slug,
    })

    if (result.isError()) {
      throw new BadRequestException()
    }

    return {
      event: result.value.event,
    }
  }
}
