import { HttpStatus, INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { DepartmentFactory } from 'test/factories/make-department'
import { EventFactory } from 'test/factories/make-event'
import { EventLotFactory } from 'test/factories/make-event-lot'
import { EventTicketFactory } from 'test/factories/make-event-ticket'
import { OrderFactory } from 'test/factories/make-order'
import { ProfileFactory } from 'test/factories/make-profile'
import { UserFactory } from 'test/factories/make-user'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('List orders by transaction id (E2E)', () => {
  let app: INestApplication
  let jwt: JwtService
  let profileFactory: ProfileFactory
  let departmentFactory: DepartmentFactory
  let userFactory: UserFactory
  let eventFactory: EventFactory
  let eventLotFactory: EventLotFactory
  let eventTicketFactory: EventTicketFactory
  let orderFactory: OrderFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        ProfileFactory,
        DepartmentFactory,
        UserFactory,
        EventFactory,
        EventLotFactory,
        EventTicketFactory,
        OrderFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    jwt = moduleRef.get(JwtService)
    profileFactory = moduleRef.get(ProfileFactory)
    departmentFactory = moduleRef.get(DepartmentFactory)
    userFactory = moduleRef.get(UserFactory)
    eventFactory = moduleRef.get(EventFactory)
    eventLotFactory = moduleRef.get(EventLotFactory)
    eventTicketFactory = moduleRef.get(EventTicketFactory)
    orderFactory = moduleRef.get(OrderFactory)

    await app.init()
  })

  test('[GET] /order/transactions/:transactionId', async () => {
    const profile = await profileFactory.makePrismaProfile()
    const department = await departmentFactory.makePrismaDepartment()

    const user = await userFactory.makePrismaUser({
      name: 'John Doe',
      profileId: profile.id,
      departmentId: department.id,
    })
    const accessToken = jwt.sign({ sub: user.id.toString() })

    const event = await eventFactory.makePrismaEvent({
      departmentId: department.id,
      createdBy: user.id,
    })

    const eventLot = await eventLotFactory.makePrismaEventLot({
      eventId: event.id,
    })

    const eventTicket = await eventTicketFactory.makePrismaEventTicket({
      eventId: event.id,
      lot: eventLot.lot,
      createdBy: user.id,
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
