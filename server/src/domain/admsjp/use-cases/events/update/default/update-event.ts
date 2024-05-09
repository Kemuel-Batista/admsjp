import { Injectable } from '@nestjs/common'
import { Event } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import HttpStatusCode from '@/core/enums/http-status-code'
import { AppError } from '@/core/errors/AppError'
import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { i18n } from '@/core/i18n/i18n'
import { Slug } from '@/core/util/slug/slug'
import { UpdateEventDTO } from '@/domain/admsjp/dtos/event'
import { EventsRepository } from '@/domain/admsjp/repositories/events-repository'
import { Uploader } from '@/domain/admsjp/storage/uploader'

interface UpdateEventUseCaseRequest extends UpdateEventDTO {
  fileName?: string
  fileType?: string
  body?: Buffer
}

type UpdateEventUseCaseResponse = Either<
  ResourceNotFoundError | ResourceAlreadyExistsError,
  {
    event: Event
  }
>

@Injectable()
export class UpdateEventUseCase {
  constructor(
    private eventsRepository: EventsRepository,
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
    event.initialDate = initialDate
    event.finalDate = finalDate
    event.status = status
    event.visible = visible
    event.eventType = eventType
    event.message = message
    event.updatedBy = updatedBy

    await this.eventsRepository.update(event)

    return success({
      event,
    })
  }
}
