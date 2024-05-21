import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { Injectable } from '@nestjs/common'
import { Event } from '@prisma/client'
import handlebars from 'handlebars'

import { Either, failure, success } from '@/core/either'
import { InvalidAttachmentTypeError } from '@/core/errors/errors/invalid-attachment-type-error'
import { ResourceAlreadyExistsError } from '@/core/errors/errors/resource-already-exists-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Slug } from '@/core/util/slug/slug'
import { EventsRepository } from '@/domain/admsjp/repositories/events-repository'
import { Uploader } from '@/domain/admsjp/storage/uploader'

import { MailNotifier } from '../../notifiers/mail-notifier'
import { EventTicketsRepository } from '../../repositories/event-tickets-repository'

interface EditEventUseCaseRequest {
  id: Event['id']
  title?: Event['title']
  description?: Event['description']
  initialDate?: Event['initialDate']
  finalDate?: Event['finalDate']
  status?: Event['status']
  visible?: Event['visible']
  eventType?: Event['eventType']
  message?: Event['message']
  fileName?: string
  fileType?: string
  body?: Buffer
  updatedBy: Event['updatedBy']
}

type EditEventUseCaseResponse = Either<
  | ResourceNotFoundError
  | ResourceAlreadyExistsError
  | InvalidAttachmentTypeError,
  {
    event: Event
  }
>

@Injectable()
export class EditEventUseCase {
  constructor(
    private eventsRepository: EventsRepository,
    private eventTicketsRepository: EventTicketsRepository,
    private uploader: Uploader,
    private mailNotifier: MailNotifier,
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
  }: EditEventUseCaseRequest): Promise<EditEventUseCaseResponse> {
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

      await this.uploader.delete(event.imagePath)

      const { url } = await this.uploader.upload({
        fileName,
        fileType,
        body,
      })

      event.imagePath = url
    }

    let renderedHtml = ''

    if (
      event.initialDate !== initialDate ||
      event.finalDate !== finalDate ||
      event.eventType !== eventType
    ) {
      // TODO: Create html content on views/event-updated.hbs
      const htmlPath = join(__dirname, '..', '..', 'views', 'event-updated.hbs')
      const templateHtml = readFileSync(htmlPath, 'utf-8')

      const compiledTemplate = handlebars.compile(templateHtml)
      // TODO: Create a redirectionLink to send to client too
      renderedHtml = compiledTemplate({
        initialDate: initialDate.toLocaleDateString(),
        finalDate: finalDate.toLocaleDateString(),
        eventType,
      })
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

    const eventTickets = await this.eventTicketsRepository.listDetailsByEventId(
      event.id,
    )

    for (const eventTicket of eventTickets) {
      await this.mailNotifier.send({
        email: eventTicket.user.email,
        title: 'Evento foi atualizado!',
        content:
          'O evento que você tem uma inscrição foi atualizado! Verique os detalhes abaixo.',
        renderedHtml,
      })
    }

    return success({
      event,
    })
  }
}
