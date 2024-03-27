import {
  Church as PrismaChurch,
  ChurchDepartment as PrismaChurchDeparment,
  ChurchLeader as PrismaChurchLeader,
  Department as PrismaDeparment,
} from '@prisma/client'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ChurchDetails } from '@/domain/admsjp/enterprise/entities/value-objects/church-details'

import { PrismaChurchDepartmentDetailsMapper } from './prisma-church-department-details-mapper'
import { PrismaChurchLeaderMapper } from './prisma-church-leader-mapper'

type PrismaChurchDepartmentDetails = PrismaChurchDeparment & {
  department: PrismaDeparment
}

type PrismaChurchDetails = PrismaChurch & {
  leaders: PrismaChurchLeader[]
  departments: Array<PrismaChurchDepartmentDetails>
}

export class PrismaChurchDetailsMapper {
  static toDomain(raw: PrismaChurchDetails): ChurchDetails {
    return ChurchDetails.create({
      churchId: new UniqueEntityID(raw.id),
      name: raw.name,
      description: raw.description,
      street: raw.street,
      neighborhood: raw.neighborhood,
      city: raw.city,
      state: raw.state,
      postalCode: raw.postalCode,
      number: raw.number,
      latitude: Number(raw.latitude),
      longitude: Number(raw.longitude),
      username: raw.username,
      leaders: raw.leaders.map(PrismaChurchLeaderMapper.toDomain),
      departments: raw.departments.map(
        PrismaChurchDepartmentDetailsMapper.toDomain,
      ),
    })
  }
}
