import { Injectable } from '@nestjs/common'
import { Event } from '@prisma/client'

import { Slug } from '@/core/util/slug/slug'

import { CreateEventDTO } from '../../dtos/create-event.dto'
import { EventsRepository } from '../../repositories/events-repository'
import { FindEventBySlugUseCase } from '../find/by-slug/find-event-by-slug'
import { FindEventByTitleUseCase } from '../find/by-title/find-event-by-title'

@Injectable()
export class CreateEventUseCase {
  constructor(
    private eventsRepository: EventsRepository,
    private findEventByTitleUseCase: FindEventByTitleUseCase,
    private findEventBySlugUseCase: FindEventBySlugUseCase,
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
    imagePath,
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
  }: CreateEventDTO): Promise<Event> {
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
      imagePath,
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

    return event
  }
}
