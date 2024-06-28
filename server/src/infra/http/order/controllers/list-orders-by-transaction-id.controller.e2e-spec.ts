import { HttpStatus, INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { DepartmentFactory } from 'test/factories/make-department'
import { EventFactory } from 'test/factories/make-event'
import { EventLotFactory } from 'test/factories/make-event-lot'
import { EventPurchaseFactory } from 'test/factories/make-event-purchase'
import { EventTicketFactory } from 'test/factories/make-event-ticket'
import { OrderFactory } from 'test/factories/make-order'
import { ProfileFactory } from 'test/factories/make-profile'
import { UserFactory } from 'test/factories/make-user'
import { UsersOnProfilesFactory } from 'test/factories/make-users-on-profiles'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('List orders by transaction id (E2E)', () => {
  let app: INestApplication
  let jwt: JwtService
  let userFactory: UserFactory
  let profileFactory: ProfileFactory
  let usersOnProfilesFactory: UsersOnProfilesFactory
  let departmentFactory: DepartmentFactory
  let eventFactory: EventFactory
  let eventLotFactory: EventLotFactory
  let eventTicketFactory: EventTicketFactory
  let eventPurchaseFactory: EventPurchaseFactory
  let orderFactory: OrderFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        UserFactory,
        ProfileFactory,
        UsersOnProfilesFactory,
        DepartmentFactory,
        EventFactory,
        EventLotFactory,
        EventTicketFactory,
        EventPurchaseFactory,
        OrderFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    jwt = moduleRef.get(JwtService)
    userFactory = moduleRef.get(UserFactory)
    profileFactory = moduleRef.get(ProfileFactory)
    usersOnProfilesFactory = moduleRef.get(UsersOnProfilesFactory)
    departmentFactory = moduleRef.get(DepartmentFactory)
    eventFactory = moduleRef.get(EventFactory)
    eventLotFactory = moduleRef.get(EventLotFactory)
    eventTicketFactory = moduleRef.get(EventTicketFactory)
    eventPurchaseFactory = moduleRef.get(EventPurchaseFactory)
    orderFactory = moduleRef.get(OrderFactory)

    await app.init()
  })

  test('[GET] /order/transactions/:transactionId', async () => {
    const profile = await profileFactory.makePrismaProfile()
    const department = await departmentFactory.makePrismaDepartment()

    const user = await userFactory.makePrismaUser({
      name: 'John Doe',
      departmentId: department.id,
    })

    await usersOnProfilesFactory.makePrismaUsersOnProfiles({
      userId: user.id,
      profileId: profile.id,
    })

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const event = await eventFactory.makePrismaEvent({
      departmentId: department.id,
      createdBy: user.id,
    })

    const eventLot = await eventLotFactory.makePrismaEventLot({
      eventId: event.id,
    })

    const eventPurchase = await eventPurchaseFactory.makePrismaEventPurchase({
      eventId: event.id,
    })

    const eventTicket = await eventTicketFactory.makePrismaEventTicket({
      eventLotId: eventLot.id,
      eventPurchaseId: eventPurchase.id,
    })
    const order = await orderFactory.makePrismaOrder({
      transactionId: eventTicket.id,
    })

    const response = await request(app.getHttpServer())
      .get(`/order/transactions/${order.transactionId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(HttpStatus.OK)
    expect(response.body).toEqual({
      parameters: expect.arrayContaining([
        expect.objectContaining({
          id: order.id,
          status: order.status,
          transactionType: order.transactionType,
        }),
      ]),
    })
  })
})
