import { Injectable } from '@nestjs/common'

import { DomainEvents } from '@/core/events/domain-events'
import { NewBelieversRepository } from '@/domain/admsjp/application/repositories/new-believers-repository'
import { NewBeliever } from '@/domain/admsjp/enterprise/entities/new-believer'

import { PrismaNewBelieverMapper } from '../mappers/prisma-new-believer-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaNewBelieversRepository implements NewBelieversRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<NewBeliever> {
    const newBeliever = await this.prisma.newBeliever.findUnique({
      where: {
        id,
      },
    })

    if (!newBeliever) {
      return null
    }

    return PrismaNewBelieverMapper.toDomain(newBeliever)
  }

  async findByPhone(phone: string): Promise<NewBeliever> {
    const newBeliever = await this.prisma.newBeliever.findUnique({
      where: {
        phone,
      },
    })

    if (!newBeliever) {
      return null
    }

    return PrismaNewBelieverMapper.toDomain(newBeliever)
  }

  async findByEmail(email: string): Promise<NewBeliever> {
    const newBeliever = await this.prisma.newBeliever.findUnique({
      where: {
        email,
      },
    })

    if (!newBeliever) {
      return null
    }

    return PrismaNewBelieverMapper.toDomain(newBeliever)
  }

  async create(newBeliever: NewBeliever): Promise<void> {
    const data = PrismaNewBelieverMapper.toPersistency(newBeliever)

    await this.prisma.newBeliever.create({
      data,
    })

    DomainEvents.dispatchEventsForAggregate(newBeliever.id)
  }
}
