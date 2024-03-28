import { Injectable } from '@nestjs/common'

import { ChurchDepartmentMembersRepository } from '@/domain/admsjp/application/repositories/church-department-members-repository'
import { ChurchDepartmentMember } from '@/domain/admsjp/enterprise/entities/church-department-member'

import { PrismaChurchDepartmentMemberMapper } from '../mappers/prisma-church-department-member-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaChurchDepartmentMembersRepository
  implements ChurchDepartmentMembersRepository
{
  constructor(private prisma: PrismaService) {}

  async createMany(
    churchDepartmentMembers: ChurchDepartmentMember[],
  ): Promise<void> {
    if (churchDepartmentMembers.length === 0) {
      return
    }

    const data = PrismaChurchDepartmentMemberMapper.toPersistencyMany(
      churchDepartmentMembers,
    )

    await this.prisma.churchDepartmentMember.createMany(data)
  }

  async deleteMany(
    churchDepartmentMembers: ChurchDepartmentMember[],
  ): Promise<void> {
    if (churchDepartmentMembers.length === 0) {
      return
    }

    const churchDepartmentMembersIds = churchDepartmentMembers.map(
      (churchLeader) => {
        return churchLeader.id.toString()
      },
    )

    await this.prisma.churchDepartmentMember.deleteMany({
      where: {
        id: {
          in: churchDepartmentMembersIds,
        },
      },
    })
  }

  async findManyByChurchDepartmentId(
    churchDepartmentId: string,
  ): Promise<ChurchDepartmentMember[]> {
    const churchLeaders = await this.prisma.churchDepartmentMember.findMany({
      where: {
        churchDepartmentId,
      },
    })

    return churchLeaders.map(PrismaChurchDepartmentMemberMapper.toDomain)
  }

  async deleteManyByChurchDepartmentId(
    churchDepartmentId: string,
  ): Promise<void> {
    await this.prisma.churchDepartmentMember.updateMany({
      where: {
        churchDepartmentId,
      },
      data: {
        deletedAt: new Date(),
      },
    })
  }
}
