import { Injectable } from '@nestjs/common'
import { Event } from '@prisma/client'

import HttpStatusCode from '@/core/enums/http-status-code'
import { AppError } from '@/core/errors/AppError'
import { i18n } from '@/core/i18n/i18n'
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
import { FindEventBySlugUseCase } from '../find/by-slug/find-event-by-slug'
import { FindEventByTitleUseCase } from '../find/by-title/find-event-by-title'

interface CreateEventUseCaseRequest extends CreateEventDTO {
  fileName: string
  fileType: string
  body: Buffer
}

@Injectable()
export class CreateEventUseCase {
  constructor(
    private eventsRepository: EventsRepository,
    private findEventByTitleUseCase: FindEventByTitleUseCase,
    private findEventBySlugUseCase: FindEventBySlugUseCase,
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
  }: CreateEventUseCaseRequest): Promise<Event> {
    const errorInvalidAttachmentType = 'event.create.invalidAttachmentType'
    const errorCodeFound = HttpStatusCode.BAD_REQUEST

    if (
      !/^(image\/(jpeg|png|webp))$|^application\/pdf$|^video\/mp4$/.test(
        fileType,
      )
    ) {
      throw new AppError(
        i18n.t(errorInvalidAttachmentType, { type: fileType }),
        errorCodeFound,
      )
    }

    await this.findEventByTitleUseCase.execute(title, {
      throwIfFound: true,
    })

    const { value: slug } = Slug.createFromText(title)

    await this.findEventBySlugUseCase.execute(slug, {
      throwIfFound: true,
    })

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
      lots,
      address,
      createdBy,
    })

    for (const lot of lots) {
      await this.createEventLotUseCase.execute({
        ...lot,
        eventId: event.id,
      })
    }

    if (eventType !== EventType.REMOTO) {
      await this.createEventAddressUseCase.execute({
        eventId: event.id,
        ...address,
      })
    }

    const { url } = await this.uploader.upload({
      fileName,
      fileType,
      body,
    })

    event.imagePath = url

    await this.eventsRepository.update(event)

    return event
  }
}
