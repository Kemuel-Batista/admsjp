import { Injectable } from '@nestjs/common'
import { Event } from '@prisma/client'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { IListOptions } from '@/core/repositories/list-options'
import { buildSearchFilter } from '@/core/util/filtering/build-search-filter'
import { calcPagination } from '@/core/util/pagination/calc-pagination'
import { CreateEventDTO } from '@/domain/event/dtos/create-event.dto'
import { ListEventDTO } from '@/domain/event/dtos/list-event.dto'
import { UpdateEventDTO } from '@/domain/event/dtos/update-event.dto'
import { EventsRepository } from '@/domain/event/repositories/events-repository'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

@Injectable()
export class PrismaEventsRepository implements EventsRepository {
  constructor(private prisma: PrismaService) {}
  async create({
    title,
    slug,
    description,
    value,
    initialDate,
    finalDate,
    status,
    visible,
    departmentId,
    eventType,
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
    const event = await this.prisma.event.create({
      data: {
        title,
        slug,
        description,
        value,
        initialDate,
        finalDate,
        status,
        visible,
        departmentId,
        eventType,
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
        updatedBy: createdBy,
      },
    })
    return event
  }

  async update({
    id,
    title,
    slug,
    description,
    value,
    initialDate,
    finalDate,
    status,
    visible,
    eventType,
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
    updatedBy,
  }: UpdateEventDTO): Promise<Event> {
    const event = await this.prisma.event.update({
      where: {
        id,
      },
      data: {
        title: title ?? undefined,
        slug: slug ?? undefined,
        description: description ?? undefined,
        value: value ?? undefined,
        initialDate: initialDate ?? undefined,
        finalDate: finalDate ?? undefined,
        status: status ?? undefined,
        visible: visible ?? undefined,
        eventType: eventType ?? undefined,
        imagePath: imagePath ?? undefined,
        street: street ?? undefined,
        number: number ?? undefined,
        complement: complement ?? undefined,
        neighborhood: neighborhood ?? undefined,
        state: state ?? undefined,
        city: city ?? undefined,
        latitude: latitude ?? undefined,
        longitude: longitude ?? undefined,
        message: message ?? undefined,
        updatedBy,
      },
    })

    return event
  }

  async list(
    options?: IListOptions,
    searchParams?: ISearchParamDTO[],
  ): Promise<ListEventDTO> {
    const { skip, take } = calcPagination(options)

    const search = buildSearchFilter<Event>(searchParams)

    const [events, count] = await this.prisma.$transaction([
      this.prisma.event.findMany({
        where: search,
        skip,
        take,
        orderBy: { id: 'asc' },
      }),
      this.prisma.event.count({ where: search }),
    ])

    return { events, count }
  }

  async findById(id: Event['id']): Promise<Event | null> {
    const event = await this.prisma.event.findUnique({
      where: {
        id,
      },
    })

    return event
  }

  async findByTitle(title: Event['title']): Promise<Event | null> {
    const event = await this.prisma.event.findUnique({
      where: {
        title,
      },
    })

    return event
  }

  async findBySlug(slug: Event['slug']): Promise<Event | null> {
    const event = await this.prisma.event.findUnique({
      where: {
        slug,
      },
    })

    return event
  }
}
