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
    const church = await this.prisma.churchDepartment.findUnique({
      where: {
        id,
      },
    })

    if (!church) {
      return null
    }

    return PrismaChurchDepartmentMapper.toDomain(church)
  }

  async findByChurchIdAndDepartmentId(
    churchId: string,
    departmentId: string,
  ): Promise<ChurchDepartment> {
    const church = await this.prisma.churchDepartment.findFirst({
      where: {
        churchId,
        departmentId,
      },
    })

    if (!church) {
      return null
    }

    return PrismaChurchDepartmentMapper.toDomain(church)
  }

  async create(churchDepartment: ChurchDepartment): Promise<void> {
    const data = PrismaChurchDepartmentMapper.toPersistency(churchDepartment)

    await this.prisma.churchDepartment.create({
      data,
    })
  }

  async save(churchDepartment: ChurchDepartment): Promise<void> {
    const data = PrismaChurchDepartmentMapper.toPersistency(churchDepartment)

    await Promise.all([
      this.prisma.churchDepartment.update({
        where: {
          id: churchDepartment.id.toString(),
        },
        data,
      }),
      this.churchDepartmentMembers.createMany(
        churchDepartment.members.getItems(),
      ),
      this.churchDepartmentMembers.createMany(
        churchDepartment.members.getNewItems(),
      ),
      this.churchDepartmentMembers.deleteMany(
        churchDepartment.members.getRemovedItems(),
      ),
    ])
  }

  async delete(churchDepartment: ChurchDepartment): Promise<void> {
    await Promise.all([
      this.prisma.churchDepartment.update({
        where: {
          id: churchDepartment.id.toString(),
        },
        data: {
          deletedAt: new Date(),
        },
      }),
      this.churchDepartmentMembers.deleteManyByChurchDepartmentId(
        churchDepartment.id.toString(),
      ),
    ])
  }
}
