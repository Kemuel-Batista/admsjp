import { Injectable } from '@nestjs/common'
import { EventAddress, Prisma } from '@prisma/client'

import { ISearchParamDTO } from '@/core/dtos/search-param-dto'
import { IListOptions } from '@/core/repositories/list-options'
import { buildSearchFilter } from '@/core/util/filtering/build-search-filter'
import { calcPagination } from '@/core/util/pagination/calc-pagination'
import { ListEventAddressesDTO } from '@/domain/admsjp/dtos/event-address'
import { EventAddressesRepository } from '@/domain/admsjp/repositories/event-addresses-repository'

import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaEventAddressesRepository
  implements EventAddressesRepository
{
  constructor(private prisma: PrismaService) {}

  async create({
    eventId,
    street,
    neighborhood,
    number,
    complement,
    state,
    city,
    latitude,
    longitude,
    createdBy,
  }: Prisma.EventAddressUncheckedCreateInput): Promise<EventAddress> {
    const eventAddress = await this.prisma.eventAddress.create({
      data: {
        eventId,
        street,
        neighborhood,
        number,
        complement,
        state,
        city,
        latitude,
        longitude,
        createdBy,
      },
    })

    return eventAddress
  }

  async update({
    id,
    eventId,
    street,
    neighborhood,
    complement,
    state,
    city,
    latitude,
    longitude,
    updatedBy,
  }: EventAddress): Promise<EventAddress> {
    const event = await this.prisma.eventAddress.update({
      where: {
        id,
      },
      data: {
        eventId: eventId ?? undefined,
        street: street ?? undefined,
        neighborhood: neighborhood ?? undefined,
        complement: complement ?? undefined,
        state: state ?? undefined,
        city: city ?? undefined,
        latitude: latitude ?? undefined,
        longitude: longitude ?? undefined,
        updatedBy,
      },
    })

    return event
  }

  async list(
    options?: IListOptions,
    searchParams?: ISearchParamDTO[],
  ): Promise<ListEventAddressesDTO> {
    const { skip, take } = calcPagination(options)

    const search = buildSearchFilter<EventAddress>(searchParams)

    const [eventAddresses, count] = await this.prisma.$transaction([
      this.prisma.eventAddress.findMany({
        where: search,
        skip,
        take,
        orderBy: { id: 'asc' },
      }),
      this.prisma.eventAddress.count({ where: search }),
    ])

    return { eventAddresses, count }
  }

  async findById(id: number): Promise<EventAddress> {
    const eventAddress = await this.prisma.eventAddress.findUnique({
      where: {
        id,
      },
    })

    return eventAddress
  }

  async findByEventId(eventId: number): Promise<EventAddress> {
    const eventAddress = await this.prisma.eventAddress.findUnique({
      where: {
        eventId,
      },
    })

    return eventAddress
  }
}
