import { Injectable } from '@nestjs/common'

import { ChurchLeadersRepository } from '@/domain/admsjp/application/repositories/church-leaders-repository'
import { ChurchLeader } from '@/domain/admsjp/enterprise/entities/church-leader'

import { PrismaChurchLeaderMapper } from '../mappers/prisma-church-leader-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaChurchLeadersRepository implements ChurchLeadersRepository {
  constructor(private prisma: PrismaService) {}

  async createMany(churchLeaders: ChurchLeader[]): Promise<void> {
    if (churchLeaders.length === 0) {
      return
    }

    churchLeaders.map(async (churchLeader) => {
      const data = PrismaChurchLeaderMapper.toPersistency(churchLeader)

      await this.prisma.churchLeader.create({
        data,
      })
    })
  }

  async deleteMany(churchLeaders: ChurchLeader[]): Promise<void> {
    if (churchLeaders.length === 0) {
      return
    }

    const churchLeadersIds = churchLeaders.map((churchLeader) => {
      return churchLeader.id.toString()
    })

    await this.prisma.churchLeader.updateMany({
      where: {
        id: {
          in: churchLeadersIds,
        },
      },
      data: {
        deletedAt: new Date(),
      },
    })
  }

  async findManyByChurchId(churchId: string): Promise<ChurchLeader[]> {
    const churchLeaders = await this.prisma.churchLeader.findMany({
      where: {
        churchId,
      },
    })

    return churchLeaders.map(PrismaChurchLeaderMapper.toDomain)
  }

  async deleteManyByChurchId(churchId: string): Promise<void> {
    await this.prisma.churchLeader.updateMany({
      where: {
        churchId,
      },
      data: {
        deletedAt: new Date(),
      },
    })
  }
}
