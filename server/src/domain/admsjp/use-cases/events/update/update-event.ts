import { Injectable } from '@nestjs/common'
import { Event } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { InvalidAttachmentTypeError } from '@/core/errors/errors/invalid-attachment-type-error'
import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Slug } from '@/core/util/slug/slug'
import { UpdateEventDTO } from '@/domain/admsjp/dtos/event'
import { EventType } from '@/domain/admsjp/enums/event'
import { EventAddressesRepository } from '@/domain/admsjp/repositories/event-addresses-repository'
import { EventLotsRepository } from '@/domain/admsjp/repositories/event-lots-repository'
import { EventsRepository } from '@/domain/admsjp/repositories/events-repository'
import { Uploader } from '@/domain/admsjp/storage/uploader'

interface UpdateEventUseCaseRequest extends UpdateEventDTO {
  fileName?: string
  fileType?: string
  body?: Buffer
}

type UpdateEventUseCaseResponse = Either<
  | ResourceNotFoundError
  | ResourceAlreadyExistsError
  | InvalidAttachmentTypeError,
  {
    event: Event
  }
>

@Injectable()
export class UpdateEventUseCase {
  constructor(
    private eventsRepository: EventsRepository,
    private eventAddressesRepository: EventAddressesRepository,
    private eventLotsRepository: EventLotsRepository,
    private uploader: Uploader,
  ) {}

  async execute({
    id,
    title,
    description,
    initialDate,
    finalDate,
    status,
    visible,
    eventType,
    fileName,
    fileType,
    body,
    message,
    lots,
    address,
    updatedBy,
  }: UpdateEventUseCaseRequest): Promise<UpdateEventUseCaseResponse> {
    const event = await this.eventsRepository.findById(id)

    if (!event) {
      return failure(
        new ResourceNotFoundError({
          errorKey: 'event.find.notFound',
          key: String(id),
        }),
      )
    }

    if (event.title !== title) {
      const eventAlreadyExistsWithTitle =
        await this.eventsRepository.findByTitle(title)

      if (eventAlreadyExistsWithTitle) {
        return failure(
          new ResourceAlreadyExistsError({
            errorKey: 'event.create.keyAlreadyExists',
            key: title,
          }),
        )
      }

      const { value: slug } = Slug.createFromText(title)

      const eventAlreadyExistsWithSlug =
        await this.eventsRepository.findBySlug(slug)

      if (eventAlreadyExistsWithSlug) {
        return failure(
          new ResourceAlreadyExistsError({
            errorKey: 'event.create.keyAlreadyExists',
            key: slug,
          }),
        )
      }

      event.title = title
      event.slug = slug
    }

    if (fileName && fileType && body) {
      if (
        !/^(image\/(jpeg|png|webp))$|^application\/pdf$|^video\/mp4$/.test(
          fileType,
        )
      ) {
        return failure(
          new InvalidAttachmentTypeError({
            errorKey: 'event.create.invalidAttachmentType',
            key: fileType,
          }),
        )
      }

      const { url } = await this.uploader.upload({
        fileName,
        fileType,
        body,
      })

      await this.uploader.delete(event.imagePath)

      event.imagePath = url
    }

    event.description = description
    event.initialDate = initialDate
    event.finalDate = finalDate
    event.status = status
    event.visible = visible
    event.eventType = eventType
    event.message = message
    event.updatedBy = updatedBy

    await this.eventsRepository.update(event)

    if (eventType !== EventType.REMOTO) {
      const eventAddress = await this.eventAddressesRepository.findByEventId(
        event.id,
      )

      if (!eventAddress) {
        await this.eventAddressesRepository.create({
          ...address,
          createdBy: updatedBy,
          eventId: event.id,
        })
      } else {
        eventAddress.street = address.street
        eventAddress.neighborhood = address.neighborhood
        eventAddress.number = address.number
        eventAddress.city = address.city
        eventAddress.state = address.state
        eventAddress.latitude = address.latitude
        eventAddress.longitude = address.longitude
        eventAddress.updatedBy = updatedBy

        await this.eventAddressesRepository.update(eventAddress)
      }
    }

    for (const lot of lots) {
      const eventLot = await this.eventLotsRepository.findByEventIdAndLot(
        lot.eventId,
        lot.lot,
      )

      if (eventLot) {
        eventLot.quantity = lot.quantity
        eventLot.updatedBy = updatedBy

        await this.eventLotsRepository.update(eventLot)
      } else {
        await this.eventLotsRepository.create({
          ...lot,
          createdBy: updatedBy,
        })
      }
    }

    return success({
      event,
    })
  }
}
