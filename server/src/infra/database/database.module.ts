import { Module } from '@nestjs/common'

import { DepartmentsRepository } from '@/domain/admsjp/repositories/departments-repository'
import { EventAddressesRepository } from '@/domain/admsjp/repositories/event-addresses-repository'
import { EventLotsRepository } from '@/domain/admsjp/repositories/event-lots-repository'
import { EventPurchasesRepository } from '@/domain/admsjp/repositories/event-purchases-repository'
import { EventTicketsRepository } from '@/domain/admsjp/repositories/event-tickets-repository'
import { EventsRepository } from '@/domain/admsjp/repositories/events-repository'
import { OrdersRepository } from '@/domain/admsjp/repositories/orders-repository'
import { ParametersRepository } from '@/domain/admsjp/repositories/parameters-repository'
import { ProfilesRepository } from '@/domain/admsjp/repositories/profiles-repository'
import { UsersOnProfilesRepository } from '@/domain/admsjp/repositories/users-on-profiles-repository'
import { UsersRepository } from '@/domain/admsjp/repositories/users-repository'
import { NotificationsRepository } from '@/domain/notification/application/repositories/notification-repository'

import { PrismaService } from './prisma/prisma.service'
import { PrismaDepartmentRepository } from './prisma/repositories/prisma-departments-repository'
import { PrismaEventAddressesRepository } from './prisma/repositories/prisma-event-addresses-repository'
import { PrismaEventLotsRepository } from './prisma/repositories/prisma-event-lots-repository'
import { PrismaEventPurchasesRepository } from './prisma/repositories/prisma-event-purchases-repository'
import { PrismaEventTicketsRepository } from './prisma/repositories/prisma-event-tickets-repository'
import { PrismaEventsRepository } from './prisma/repositories/prisma-events-repository'
import { PrismaNotificationsRepository } from './prisma/repositories/prisma-notifications-repository'
import { PrismaOrdersRepository } from './prisma/repositories/prisma-orders-repository'
import { PrismaParametersRepository } from './prisma/repositories/prisma-parameters-repository'
import { PrismaProfilesRepository } from './prisma/repositories/prisma-profiles-repository'
import { PrismaUsersOnProfilesRepository } from './prisma/repositories/prisma-users-on-profiles-repository'
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: DepartmentsRepository,
      useClass: PrismaDepartmentRepository,
    },
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: ProfilesRepository,
      useClass: PrismaProfilesRepository,
    },
    {
      provide: UsersOnProfilesRepository,
      useClass: PrismaUsersOnProfilesRepository,
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
      provide: EventPurchasesRepository,
      useClass: PrismaEventPurchasesRepository,
    },
    {
      provide: EventTicketsRepository,
      useClass: PrismaEventTicketsRepository,
    },
    {
      provide: OrdersRepository,
      useClass: PrismaOrdersRepository,
    },
    {
      provide: ParametersRepository,
      useClass: PrismaParametersRepository,
    },
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [
    PrismaService,
    DepartmentsRepository,
    UsersRepository,
    ProfilesRepository,
    UsersOnProfilesRepository,
    EventsRepository,
    EventLotsRepository,
    EventAddressesRepository,
    EventPurchasesRepository,
    EventTicketsRepository,
    OrdersRepository,
    ParametersRepository,
    NotificationsRepository,
  ],
})
export class DatabaseModule {}
