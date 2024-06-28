import { Injectable } from '@nestjs/common'
import { EventAddress, Prisma } from '@prisma/client'

import { ListOptions } from '@/core/repositories/list-options'
import { calcPagination } from '@/core/util/pagination/calc-pagination'
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

  async list(options?: ListOptions): Promise<EventAddress[]> {
    const { skip, take } = calcPagination(options)

    const eventAddresses = await this.prisma.eventAddress.findMany({
      skip,
      take,
      orderBy: { id: 'asc' },
    })

    return eventAddresses
  }

  async findById(id: EventAddress['id']): Promise<EventAddress> {
    const eventAddress = await this.prisma.eventAddress.findUnique({
      where: {
        id,
      },
    })

    return eventAddress
  }

  async findByEventId(eventId: EventAddress['eventId']): Promise<EventAddress> {
    const eventAddress = await this.prisma.eventAddress.findUnique({
      where: {
        eventId,
      },
    })

    return eventAddress
  }
}
