import { Injectable } from '@nestjs/common'
import { EventAddress } from '@prisma/client'

import HttpStatusCode from '@/core/enums/http-status-code'
import { AppError } from '@/core/errors/AppError'
import { i18n } from '@/core/i18n/i18n'
import { IFindOptions } from '@/core/repositories/find-options'
import { EventAddressesRepository } from '@/domain/admsjp/repositories/event-addresses-repository'

type TFindEventAddressByEventIdUseCase<Options extends IFindOptions> =
  | EventAddress
  | (Options['throwIfNotFound'] extends true ? never : null)

@Injectable()
export class FindEventAddressByEventIdUseCase {
  constructor(private eventAddressesRepository: EventAddressesRepository) {}

  async execute<Options extends IFindOptions>(
    eventId: EventAddress['eventId'],
    options: Partial<Options> = {},
  ): Promise<TFindEventAddressByEventIdUseCase<Options>> {
    const {
      throwIfFound = false,
      throwIfNotFound = false,
      errorKeyFound = 'eventAddress.create.alreadyExists',
      errorKeyNotFound = 'eventAddress.find.notFound',
      errorCodeFound = HttpStatusCode.BAD_REQUEST,
      errorCodeNotFound = HttpStatusCode.NOT_FOUND,
    } = options

    const eventAddress =
      await this.eventAddressesRepository.findByEventId(eventId)

    if (throwIfFound && eventAddress) {
      throw new AppError(i18n.t(errorKeyFound, { eventId }), errorCodeFound)
    }

    if (throwIfNotFound && !eventAddress) {
      throw new AppError(
        i18n.t(errorKeyNotFound, { eventAddress: eventId }),
        errorCodeNotFound,
      )
    }

    return eventAddress as TFindEventAddressByEventIdUseCase<Options>
  }
}
