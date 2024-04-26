import { Injectable } from '@nestjs/common'
import { Event } from '@prisma/client'

import HttpStatusCode from '@/core/enums/http-status-code'
import { AppError } from '@/core/errors/AppError'
import { i18n } from '@/core/i18n/i18n'
import { Slug } from '@/core/util/slug/slug'
import { EventsRepository } from '@/domain/admsjp/repositories/events-repository'
import { Uploader } from '@/domain/admsjp/storage/uploader'

import { FindEventByIdUseCase } from '../../find/by-id/find-event-by-id'
import { FindEventBySlugUseCase } from '../../find/by-slug/find-event-by-slug'
import { FindEventByTitleUseCase } from '../../find/by-title/find-event-by-title'

interface UpdateEventUseCaseRequest {
  id: Event['id']
  title?: Event['title']
  description?: Event['description']
  value?: Event['value']
  initialDate?: Event['initialDate']
  finalDate?: Event['finalDate']
  status?: Event['status']
  visible?: Event['visible']
  departmentId?: Event['departmentId']
  eventType?: Event['eventType']
  fileName?: string
  fileType?: string
  body?: Buffer
  street?: Event['street']
  number?: Event['number']
  complement?: Event['complement']
  neighborhood?: Event['neighborhood']
  state?: Event['state']
  city?: Event['city']
  latitude?: Event['latitude']
  longitude?: Event['longitude']
  message?: Event['message']
  updatedBy: Event['updatedBy']
}

@Injectable()
export class UpdateEventUseCase {
  constructor(
    private eventsRepository: EventsRepository,
    private findEventByIdUseCase: FindEventByIdUseCase,
    private findEventByTitleUseCase: FindEventByTitleUseCase,
    private findEventBySlugUseCase: FindEventBySlugUseCase,
    private uploader: Uploader,
  ) {}

  async execute({
    id,
    title,
    description,
    value,
    initialDate,
    finalDate,
    status,
    visible,
    eventType,
    fileName,
    fileType,
    body,
    street,
    number,
    complement,
    neighborhood,
    state,
    city,
    latitude,
    longitude,
    message,
    updatedBy,
  }: UpdateEventUseCaseRequest): Promise<Event> {
    const event = await this.findEventByIdUseCase.execute(id, {
      throwIfFound: true,
    })

    if (event.title !== title) {
      await this.findEventByTitleUseCase.execute(title, {
        throwIfFound: true,
      })

      const { value: slug } = Slug.createFromText(title)

      if (event.slug !== slug) {
        await this.findEventBySlugUseCase.execute(slug, {
          throwIfFound: true,
        })
      }

      event.title = title
      event.slug = slug
    }

    if (fileName && fileType && body) {
      const errorInvalidAttachmentType = 'event.create.keyAlreadyExists'
      const errorCodeFound = HttpStatusCode.BAD_REQUEST

      if (
        !/^(image\/(jpeg|png|webp))$|^application\/pdf$|^video\/mp4$/.test(
          fileType,
        )
      ) {
        throw new AppError(
          i18n.t(errorInvalidAttachmentType, { fileType }),
          errorCodeFound,
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
    event.value = value
    event.initialDate = initialDate
    event.finalDate = finalDate
    event.status = status
    event.visible = visible
    event.eventType = eventType
    event.street = street
    event.number = number
    event.complement = complement
    event.neighborhood = neighborhood
    event.state = state
    event.city = city
    event.latitude = latitude
    event.longitude = longitude
    event.message = message
    event.updatedBy = updatedBy

    await this.eventsRepository.update(event)

    return event
  }
}
