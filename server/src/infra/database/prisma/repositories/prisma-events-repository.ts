import { Injectable } from '@nestjs/common'
import { Event, Prisma } from '@prisma/client'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { IListOptions } from '@/core/repositories/list-options'
import { buildSearchFilter } from '@/core/util/filtering/build-search-filter'
import { calcPagination } from '@/core/util/pagination/calc-pagination'
import { ListEventDTO } from '@/domain/admsjp/dtos/event'
import { EventsRepository } from '@/domain/admsjp/repositories/events-repository'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

@Injectable()
export class PrismaEventsRepository implements EventsRepository {
  constructor(private prisma: PrismaService) {}
  async create({
    title,
    slug,
    description,
    initialDate,
    finalDate,
    status,
    visible,
    departmentId,
    eventType,
    imagePath,
    message,
    createdBy,
  }: Prisma.EventUncheckedCreateInput): Promise<Event> {
    const event = await this.prisma.event.create({
      data: {
        title,
        slug,
        description,
        initialDate,
        finalDate,
        status,
        visible,
        departmentId,
        eventType,
        imagePath,
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
    initialDate,
    finalDate,
    status,
    visible,
    eventType,
    imagePath,
    message,
    updatedBy,
  }: Event): Promise<Event> {
    const event = await this.prisma.event.update({
      where: {
        id,
      },
      data: {
        title: title ?? undefined,
        slug: slug ?? undefined,
        description: description ?? undefined,
        initialDate: initialDate ?? undefined,
        finalDate: finalDate ?? undefined,
        status: status ?? undefined,
        visible: visible ?? undefined,
        eventType: eventType ?? undefined,
        imagePath: imagePath ?? undefined,
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

  async delete(id: Event['id']): Promise<void> {
    await this.prisma.profilePermission.delete({
      where: { id },
    })
  }
}
