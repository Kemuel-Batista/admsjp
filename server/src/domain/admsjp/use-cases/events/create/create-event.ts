import { Injectable } from '@nestjs/common'
import { Event } from '@prisma/client'

import HttpStatusCode from '@/core/enums/http-status-code'
import { AppError } from '@/core/errors/AppError'
import { i18n } from '@/core/i18n/i18n'
import { Slug } from '@/core/util/slug/slug'
import { EventsRepository } from '@/domain/admsjp/repositories/events-repository'
import { Uploader } from '@/domain/admsjp/storage/uploader'

import { FindEventBySlugUseCase } from '../find/by-slug/find-event-by-slug'
import { FindEventByTitleUseCase } from '../find/by-title/find-event-by-title'

interface CreateEventUseCaseRequest {
  title: Event['title']
  description: Event['description']
  value: Event['value']
  initialDate: Event['initialDate']
  finalDate: Event['finalDate']
  status: Event['status']
  visible: Event['visible']
  departmentId: Event['departmentId']
  eventType: Event['eventType']
  fileName: string
  fileType: string
  body: Buffer
  street?: Event['street']
  number?: Event['number']
  complement?: Event['complement']
  neighborhood?: Event['neighborhood']
  state?: Event['state']
  city?: Event['city']
  latitude?: Event['latitude']
  longitude?: Event['longitude']
  message?: Event['message']
  createdBy: Event['createdBy']
}

@Injectable()
export class CreateEventUseCase {
  constructor(
    private eventsRepository: EventsRepository,
    private findEventByTitleUseCase: FindEventByTitleUseCase,
    private findEventBySlugUseCase: FindEventBySlugUseCase,
    private uploader: Uploader,
  ) {}

  async execute({
    title,
    description,
    value,
    initialDate,
    finalDate,
    status = 1,
    visible = 1,
    eventType,
    departmentId,
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
    createdBy,
  }: CreateEventUseCaseRequest): Promise<Event> {
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
      value,
      initialDate,
      finalDate,
      status,
      visible,
      eventType,
      departmentId,
      imagePath: '', // Inicialmente vazia, após cadastro fazer upload
      street,
      number,
      complement,
      neighborhood,
      state,
      city,
      latitude,
      longitude,
      message,
      createdBy,
    })

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
