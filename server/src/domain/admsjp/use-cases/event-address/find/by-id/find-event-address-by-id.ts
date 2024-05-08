import { Injectable } from '@nestjs/common'
import { EventAddress } from '@prisma/client'

import HttpStatusCode from '@/core/enums/http-status-code'
import { AppError } from '@/core/errors/AppError'
import { i18n } from '@/core/i18n/i18n'
import { IFindOptions } from '@/core/repositories/find-options'
import { EventAddressesRepository } from '@/domain/admsjp/repositories/event-addresses-repository'

type TFindEventAddressByIdUseCase<Options extends IFindOptions> =
  | EventAddress
  | (Options['throwIfNotFound'] extends true ? never : null)

@Injectable()
export class FindEventAddressByIdUseCase {
  constructor(private eventAddressesRepository: EventAddressesRepository) {}

  async execute<Options extends IFindOptions>(
    id: EventAddress['id'],
    options: Partial<Options> = {},
  ): Promise<TFindEventAddressByIdUseCase<Options>> {
    const {
      throwIfNotFound = false,
      errorKeyNotFound = 'eventAddress.find.notFound',
      errorCodeNotFound = HttpStatusCode.NOT_FOUND,
    } = options

    const eventAddress = await this.eventAddressesRepository.findById(id)

    if (throwIfNotFound && !eventAddress) {
      throw new AppError(
        i18n.t(errorKeyNotFound, { eventAddress: id }),
        errorCodeNotFound,
      )
    }

    return eventAddress as TFindEventAddressByIdUseCase<Options>
  }
}
