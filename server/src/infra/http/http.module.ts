import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'

import { GetUserPermissionUseCase } from '@/domain/admsjp/use-cases/user/get-user-permission'
import { EventHttpModule } from '@/infra/http/events/event-http.module'
import { ProfileHttpModule } from '@/infra/http/profile/profile-http.module'
import { ProfilePermissionHttpModule } from '@/infra/http/profile-permission/profile-permission-http.module'
import { AuthHttpModule } from '@/infra/http/user/auth-http.module'
import { GetUserPermissionController } from '@/infra/http/user/controllers/get-user-permission.controller'
import { UserHttpModule } from '@/infra/http/user/user-http.module'

import { DatabaseModule } from '../database/database.module'
import { DepartmentsHttpModule } from './departments/departments-http.module'
import { EventAddressHttpModule } from './event-address/event-address-http.module'
import { EventLotHttpModule } from './event-lot/event-lot-http.module'
import { EventPurchaseHttpModule } from './event-purchase/event-purchase-http.module'
import { EventTicketHttpModule } from './event-ticket/event-ticket-http.module'
import { OrderHttpModule } from './order/order-http.module'
import { ParameterHttpModule } from './parameter/parameter-http.module'

@Module({
  imports: [
    DatabaseModule,
    AuthHttpModule,
    RouterModule.register([{ path: 'auth', module: AuthHttpModule }]),
    UserHttpModule,
    RouterModule.register([{ path: 'users', module: UserHttpModule }]),
    ProfileHttpModule,
    ProfilePermissionHttpModule,
    RouterModule.register([
      {
        path: 'profile',
        module: ProfileHttpModule,
        children: [
          {
            path: 'profile-permission',
            module: ProfilePermissionHttpModule,
          },
        ],
      },
    ]),
    DepartmentsHttpModule,
    RouterModule.register([
      { path: 'departments', module: DepartmentsHttpModule },
    ]),
    EventHttpModule,
    EventAddressHttpModule,
    EventLotHttpModule,
    EventTicketHttpModule,
    RouterModule.register([
      {
        path: 'events',
        module: EventHttpModule,
        children: [
          {
            path: 'address',
            module: EventAddressHttpModule,
          },
          {
            path: 'lot',
            module: EventLotHttpModule,
          },
          {
            path: 'purchases',
            module: EventPurchaseHttpModule,
          },
          {
            path: 'tickets',
            module: EventTicketHttpModule,
          },
        ],
      },
    ]),
    ParameterHttpModule,
    RouterModule.register([{ path: 'parameter', module: ParameterHttpModule }]),
    OrderHttpModule,
    RouterModule.register([{ path: 'order', module: OrderHttpModule }]),
  ],
  controllers: [GetUserPermissionController],
  providers: [GetUserPermissionUseCase],
})
export class HttpModule {}
