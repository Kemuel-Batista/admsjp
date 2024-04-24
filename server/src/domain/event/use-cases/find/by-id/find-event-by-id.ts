import { Injectable } from '@nestjs/common'
import { Event } from '@prisma/client'

import HttpStatusCode from '@/core/enums/http-status-code'
import { AppError } from '@/core/errors/AppError'
import { i18n } from '@/core/i18n/i18n'
import { IFindOptions } from '@/core/repositories/find-options'
import { EventsRepository } from '@/domain/event/repositories/events-repository'

type TFindEventByIdUseCase<Options extends IFindOptions> =
  | Event
  | (Options['throwIfNotFound'] extends true ? never : null)

@Injectable()
export class FindEventByIdUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute<Options extends IFindOptions>(
    id: Event['id'],
    options: Partial<Options> = {},
  ): Promise<TFindEventByIdUseCase<Options>> {
    const {
      throwIfNotFound = false,
      errorKeyNotFound = 'event.find.notFound',
      errorCodeNotFound = HttpStatusCode.NOT_FOUND,
    } = options

    const event = await this.eventsRepository.findById(id)

    if (throwIfNotFound && !event) {
      throw new AppError(
        i18n.t(errorKeyNotFound, { event: id }),

        errorCodeNotFound,
      )
    }

    return event as TFindEventByIdUseCase<Options>
  }
}
