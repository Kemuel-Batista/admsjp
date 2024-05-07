import { Injectable } from '@nestjs/common'
import { EventLot } from '@prisma/client'

import HttpStatusCode from '@/core/enums/http-status-code'
import { AppError } from '@/core/errors/AppError'
import { i18n } from '@/core/i18n/i18n'
import { IFindOptions } from '@/core/repositories/find-options'
import { EventLotsRepository } from '@/domain/admsjp/repositories/event-lots-repository'

type TFindEventLotByIdUseCase<Options extends IFindOptions> =
  | EventLot
  | (Options['throwIfNotFound'] extends true ? never : null)

@Injectable()
export class FindEventLotByIdUseCase {
  constructor(private eventLotsRepository: EventLotsRepository) {}

  async execute<Options extends IFindOptions>(
    id: EventLot['id'],
    options: Partial<Options> = {},
  ): Promise<TFindEventLotByIdUseCase<Options>> {
    const {
      throwIfNotFound = false,
      errorKeyNotFound = 'eventLot.find.notFound',
      errorCodeNotFound = HttpStatusCode.NOT_FOUND,
    } = options

    const eventLot = await this.eventLotsRepository.findById(id)

    if (throwIfNotFound && !eventLot) {
      throw new AppError(
        i18n.t(errorKeyNotFound, { eventLot: id }),

        errorCodeNotFound,
      )
    }

    return eventLot as TFindEventLotByIdUseCase<Options>
  }
}
