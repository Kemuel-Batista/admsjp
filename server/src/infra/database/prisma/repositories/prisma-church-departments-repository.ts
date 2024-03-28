import { Injectable } from '@nestjs/common'

import { ChurchDepartmentMembersRepository } from '@/domain/admsjp/application/repositories/church-department-members-repository'
import { ChurchDepartmentsRepository } from '@/domain/admsjp/application/repositories/church-departments-repository'
import { ChurchDepartment } from '@/domain/admsjp/enterprise/entities/church-department'

import { PrismaChurchDepartmentMapper } from '../mappers/prisma-church-department-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaChurchDepartmentsRepository
  implements ChurchDepartmentsRepository
{
  constructor(
    private prisma: PrismaService,
    private churchDepartmentMembers: ChurchDepartmentMembersRepository,
  ) {}

  async findById(id: string): Promise<ChurchDepartment> {
    const churchDepartment = await this.prisma.churchDepartment.findUnique({
      where: {
        id,
      },
    })

    if (!churchDepartment) {
      return null
    }

    return PrismaChurchDepartmentMapper.toDomain(churchDepartment)
  }

  async createMany(churchDepartments: ChurchDepartment[]): Promise<void> {
    if (churchDepartments.length === 0) {
      return
    }

    churchDepartments.map(async (churchDepartment) => {
      const data = PrismaChurchDepartmentMapper.toPersistency(churchDepartment)

      await this.prisma.churchDepartment.create({
        data,
      })
    })
  }

  async deleteMany(churchDepartments: ChurchDepartment[]): Promise<void> {
    if (churchDepartments.length === 0) {
      return
    }

    const churchDepartmentsIds = churchDepartments.map((churchDepartment) => {
      return churchDepartment.id.toString()
    })

    await this.prisma.churchDepartment.updateMany({
      where: {
        id: {
          in: churchDepartmentsIds,
        },
      },
      data: {
        deletedAt: new Date(),
      },
    })
  }

  async findManyByChurchId(churchId: string): Promise<ChurchDepartment[]> {
    const churchDepartments = await this.prisma.churchDepartment.findMany({
      where: {
        churchId,
      },
    })

    return churchDepartments.map(PrismaChurchDepartmentMapper.toDomain)
  }

  async deleteManyByChurchId(churchId: string): Promise<void> {
    await this.prisma.churchDepartment.updateMany({
      where: {
        churchId,
      },
      data: {
        deletedAt: new Date(),
      },
    })
  }

  async save(churchDepartment: ChurchDepartment): Promise<void> {
    const data = PrismaChurchDepartmentMapper.toPersistency(churchDepartment)

    await this.prisma.churchDepartment.update({
      where: {
        id: churchDepartment.id.toString(),
      },
      data,
    })

    await this.churchDepartmentMembers.deleteMany(
      churchDepartment.members.getRemovedItems(),
    )

    await this.churchDepartmentMembers.createMany(
      churchDepartment.members.getNewItems(),
    )
  }
}
