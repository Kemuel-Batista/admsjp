import { Injectable } from '@nestjs/common'
import { Event } from '@prisma/client'

import { Either, failure, success } from '@/core/either'
import { InvalidAttachmentTypeError } from '@/core/errors/errors/invalid-attachment-type-error'
import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error'
import { Slug } from '@/core/util/slug/slug'
import { CreateEventDTO } from '@/domain/admsjp/dtos/event'
import {
  EventStatus,
  EventType,
  EventVisible,
} from '@/domain/admsjp/enums/event'
import { EventsRepository } from '@/domain/admsjp/repositories/events-repository'
import { Uploader } from '@/domain/admsjp/storage/uploader'

import { CreateEventAddressUseCase } from '../../event-address/create/create-event-address'
import { CreateEventLotUseCase } from '../../event-lot/create/create-event-lot'

interface CreateEventUseCaseRequest extends CreateEventDTO {
  fileName: string
  fileType: string
  body: Buffer
}

type CreateEventUseCaseResponse = Either<
  InvalidAttachmentTypeError | ResourceAlreadyExistsError,
  {
    event: Event
  }
>

@Injectable()
export class CreateEventUseCase {
  constructor(
    private eventsRepository: EventsRepository,
    private createEventLotUseCase: CreateEventLotUseCase,
    private createEventAddressUseCase: CreateEventAddressUseCase,
    private uploader: Uploader,
  ) {}

  async execute({
    title,
    description,
    initialDate,
    finalDate,
    status = EventStatus.ACTIVE,
    visible = EventVisible.VISIBLE,
    eventType,
    departmentId,
    fileName,
    fileType,
    body,
    lots,
    address,
    message,
    createdBy,
  }: CreateEventUseCaseRequest): Promise<CreateEventUseCaseResponse> {
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

    const event = await this.eventsRepository.create({
      title,
      slug,
      description,
      initialDate,
      finalDate,
      status,
      visible,
      eventType,
      departmentId,
      imagePath: '', // Inicialmente vazia, após cadastro fazer upload
      message,
      createdBy,
    })

    for (const lot of lots) {
      await this.createEventLotUseCase.execute({
        ...lot,
        createdBy,
        eventId: event.id,
      })
    }

    if (eventType !== EventType.REMOTO) {
      await this.createEventAddressUseCase.execute({
        ...address,
        createdBy,
        eventId: event.id,
      })
    }

    const { url } = await this.uploader.upload({
      fileName,
      fileType,
      body,
    })

    event.imagePath = url

    await this.eventsRepository.update(event)

    return success({
      event,
    })
  }
}
