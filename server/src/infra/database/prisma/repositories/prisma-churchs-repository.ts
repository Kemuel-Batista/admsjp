import { Injectable } from '@nestjs/common'

import { PaginationParams } from '@/core/repositories/paginations-params'
import { ChurchDepartmentsRepository } from '@/domain/admsjp/application/repositories/church-departments-repository'
import { ChurchLeadersRepository } from '@/domain/admsjp/application/repositories/church-leaders-repository'
import { ChurchsRepository } from '@/domain/admsjp/application/repositories/churchs-repository'
import { Church } from '@/domain/admsjp/enterprise/entities/church'
import { ChurchDetails } from '@/domain/admsjp/enterprise/entities/value-objects/church-details'

import { PrismaChurchDetailsMapper } from '../mappers/prisma-church-details-mapper'
import { PrismaChurchMapper } from '../mappers/prisma-church-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaChurchsRepository implements ChurchsRepository {
  constructor(
    private prisma: PrismaService,
    private churchLeadersRepository: ChurchLeadersRepository,
    private churchDepartmentsRepository: ChurchDepartmentsRepository,
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

  async findDetailsById(id: string): Promise<ChurchDetails | null> {
    const church = await this.prisma.church.findUnique({
      where: {
        id,
      },
      include: {
        leaders: true,
        departments: {
          include: {
            department: true,
            members: true,
          },
        },
      },
    })

    if (!church) {
      return null
    }

    return PrismaChurchDetailsMapper.toDomain(church)
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

  async findMany({ page }: PaginationParams): Promise<Church[]> {
    const churchs = await this.prisma.church.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return churchs.map(PrismaChurchMapper.toDomain)
  }

  async create(church: Church): Promise<void> {
    const data = PrismaChurchMapper.toPersistency(church)

    await this.prisma.church.create({
      data,
    })

    await this.churchDepartmentsRepository.createMany(
      church.departments.getItems(),
    )
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
      this.churchLeadersRepository.deleteMany(church.leaders.getRemovedItems()),
      this.churchLeadersRepository.createMany(church.leaders.getNewItems()),
      this.churchDepartmentsRepository.createMany(
        church.departments.getNewItems(),
      ),
      this.churchDepartmentsRepository.deleteMany(
        church.departments.getRemovedItems(),
      ),
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
