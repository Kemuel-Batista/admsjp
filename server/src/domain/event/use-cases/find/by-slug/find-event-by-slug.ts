import { Injectable } from '@nestjs/common'
import { Event } from '@prisma/client'

import HttpStatusCode from '@/core/enums/HttpStatusCode'
import { AppError } from '@/core/errors/AppError'
import { i18n } from '@/core/i18n/i18n'
import { IFindOptions } from '@/core/repositories/find-options'
import { EventsRepository } from '@/domain/event/repositories/events-repository'

type TFindEventBySlug<Options extends IFindOptions> =
  | Event
  | (Options['throwIfNotFound'] extends true ? never : null)

@Injectable()
export class FindEventBySlugUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute<Options extends IFindOptions>(
    slug: Event['slug'],
    options: IFindOptions = {},
  ): Promise<TFindEventBySlug<Options>> {
    const {
      throwIfFound = false,
      throwIfNotFound = false,
      errorKeyFound = 'event.create.keyAlreadyExists',
      errorKeyNotFound = 'event.find.notFound',
      errorCodeFound = HttpStatusCode.BAD_REQUEST,
      errorCodeNotFound = HttpStatusCode.NOT_FOUND,
    } = options

    const event = await this.eventsRepository.findBySlug(slug)

    if (throwIfFound && event) {
      throw new AppError(i18n.t(errorKeyFound, { slug }), errorCodeFound)
    }

    if (throwIfNotFound && !event) {
      throw new AppError(
        i18n.t(errorKeyNotFound, { event: slug }),

        errorCodeNotFound,
      )
    }

    return event as TFindEventBySlug<Options>
  }
}
