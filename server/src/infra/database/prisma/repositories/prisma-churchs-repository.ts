import { Injectable } from '@nestjs/common'

import { ChurchLeadersRepository } from '@/domain/admsjp/application/repositories/church-leaders-repository'
import { ChurchsRepository } from '@/domain/admsjp/application/repositories/churchs-repository'
import { Church } from '@/domain/admsjp/enterprise/entities/church'

import { PrismaChurchMapper } from '../mappers/prisma-church-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaChurchsRepository implements ChurchsRepository {
  constructor(
    private prisma: PrismaService,
    private churchLeadersRepository: ChurchLeadersRepository,
  ) {}

  async findById(id: string): Promise<Church> {
    const church = await this.prisma.church.findUnique({
      where: {
        id,
      },
    })

    if (!church) {
      return null
    }

    return PrismaChurchMapper.toDomain(church)
  }

  async findByName(name: string, id?: string): Promise<Church> {
    const church = await this.prisma.church.findUnique({
      where: {
        name,
        id,
      },
    })

    if (!church) {
      return null
    }

    return PrismaChurchMapper.toDomain(church)
  }

  async findByUsername(username: string): Promise<Church> {
    const church = await this.prisma.church.findUnique({
      where: {
        username,
      },
    })

    if (!church) {
      return null
    }

    return PrismaChurchMapper.toDomain(church)
  }

  async create(church: Church): Promise<void> {
    const data = PrismaChurchMapper.toPersistency(church)

    await this.prisma.church.create({
      data,
    })
  }

  async save(church: Church): Promise<void> {
    const data = PrismaChurchMapper.toPersistency(church)

    await Promise.all([
      this.prisma.church.update({
        where: {
          id: church.id.toString(),
        },
        data,
      }),
      this.churchLeadersRepository.createMany(church.leaders.getNewItems()),
      this.churchLeadersRepository.deleteMany(church.leaders.getRemovedItems()),
    ])
  }

  async delete(church: Church): Promise<void> {
    const data = PrismaChurchMapper.toPersistency(church)

    await this.prisma.church.update({
      where: {
        id: church.id.toString(),
      },
      data,
    })
  }
}
