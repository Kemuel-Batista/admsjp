import { Module } from '@nestjs/common'

import { DepartmentsRepository } from '@/domain/admsjp/repositories/departments-repository'
import { EventAddressesRepository } from '@/domain/admsjp/repositories/event-addresses-repository'
import { EventLotsRepository } from '@/domain/admsjp/repositories/event-lots-repository'
import { EventTicketsRepository } from '@/domain/admsjp/repositories/event-tickets-repository'
import { EventsRepository } from '@/domain/admsjp/repositories/events-repository'
import { LogsRepository } from '@/domain/admsjp/repositories/logs-repository'
import { ProfilePermissionsRepository } from '@/domain/admsjp/repositories/profile-permissions-repository'
import { ProfilesRepository } from '@/domain/admsjp/repositories/profiles-repository'
import { UserTokensRepository } from '@/domain/admsjp/repositories/user-tokens-repository'
import { UsersRepository } from '@/domain/admsjp/repositories/users-repository'

import { PrismaService } from './prisma/prisma.service'
import { PrismaDepartmentRepository } from './prisma/repositories/prisma-departments-repository'
import { PrismaEventAddressesRepository } from './prisma/repositories/prisma-event-addresses-repository'
import { PrismaEventLotsRepository } from './prisma/repositories/prisma-event-lots-repository'
import { PrismaEventTicketsRepository } from './prisma/repositories/prisma-event-tickets-repository'
import { PrismaEventsRepository } from './prisma/repositories/prisma-events-repository'
import { PrismaLogsRepository } from './prisma/repositories/prisma-logs-repository'
import { PrismaProfilePermissionsRepository } from './prisma/repositories/prisma-profile-permissions-repository'
import { PrismaProfilesRepository } from './prisma/repositories/prisma-profiles-repository'
import { PrismaUserTokensRepository } from './prisma/repositories/prisma-user-tokens-repository'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: LogsRepository,
      useClass: PrismaLogsRepository,
    },
    {
      provide: DepartmentsRepository,
      useClass: PrismaDepartmentRepository,
    },
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: UserTokensRepository,
      useClass: PrismaUserTokensRepository,
    },
    {
      provide: ProfilesRepository,
      useClass: PrismaProfilesRepository,
    },
    {
      provide: ProfilePermissionsRepository,
      useClass: PrismaProfilePermissionsRepository,
    },
    {
      provide: EventsRepository,
      useClass: PrismaEventsRepository,
    },
    {
      provide: EventLotsRepository,
      useClass: PrismaEventLotsRepository,
    },
    {
      provide: EventAddressesRepository,
      useClass: PrismaEventAddressesRepository,
    },
    {
      provide: EventTicketsRepository,
      useClass: PrismaEventTicketsRepository,
    },
  ],
  exports: [
    PrismaService,
    LogsRepository,
    DepartmentsRepository,
    UsersRepository,
    UserTokensRepository,
    ProfilesRepository,
    ProfilePermissionsRepository,
    EventsRepository,
    EventLotsRepository,
    EventAddressesRepository,
    EventTicketsRepository,
  ],
})
export class DatabaseModule {}
