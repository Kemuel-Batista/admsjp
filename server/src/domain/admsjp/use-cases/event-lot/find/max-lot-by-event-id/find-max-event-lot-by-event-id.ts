import { Injectable } from '@nestjs/common'
import { EventLot } from '@prisma/client'

import HttpStatusCode from '@/core/enums/http-status-code'
import { AppError } from '@/core/errors/AppError'
import { i18n } from '@/core/i18n/i18n'
import { IFindOptions } from '@/core/repositories/find-options'
import { EventLotsRepository } from '@/domain/admsjp/repositories/event-lots-repository'

type TFindMaxEventLotByEventIdUseCase<Options extends IFindOptions> =
  | number
  | (Options['throwIfNotFound'] extends true ? never : null)

@Injectable()
export class FindMaxEventLotByEventIdUseCase {
  constructor(private eventLotsRepository: EventLotsRepository) {}

  async execute<Options extends IFindOptions>(
    eventId: EventLot['id'],
    options: Partial<Options> = {},
  ): Promise<TFindMaxEventLotByEventIdUseCase<Options>> {
    const {
      throwIfNotFound = false,
      errorKeyNotFound = 'event-lot.find.notFound',
      errorCodeNotFound = HttpStatusCode.NOT_FOUND,
    } = options

    const eventLot = await this.eventLotsRepository.findMaxLotByEventId(eventId)

    if (throwIfNotFound && !eventLot) {
      throw new AppError(
        i18n.t(errorKeyNotFound, { event: eventId }),
        errorCodeNotFound,
      )
    }

    const maxEventLot = eventLot.lot

    return maxEventLot as TFindMaxEventLotByEventIdUseCase<Options>
  }
}
