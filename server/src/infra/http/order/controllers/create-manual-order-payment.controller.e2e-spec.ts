import { HttpStatus, INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { DepartmentFactory } from 'test/factories/make-department'
import { EventFactory } from 'test/factories/make-event'
import { EventLotFactory } from 'test/factories/make-event-lot'
import { EventPurchaseFactory } from 'test/factories/make-event-purchase'
import { EventTicketFactory } from 'test/factories/make-event-ticket'
import { ProfileFactory } from 'test/factories/make-profile'
import { UserFactory } from 'test/factories/make-user'
import { UsersOnProfilesFactory } from 'test/factories/make-users-on-profiles'

import { OrderStatus } from '@/domain/admsjp/enums/order'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Create manual order payment (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService
  let userFactory: UserFactory
  let profileFactory: ProfileFactory
  let usersOnProfilesFactory: UsersOnProfilesFactory
  let departmentFactory: DepartmentFactory
  let eventFactory: EventFactory
  let eventLotFactory: EventLotFactory
  let eventPurchaseFactory: EventPurchaseFactory
  let eventTicketFactory: EventTicketFactory

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
        EventPurchaseFactory,
        EventTicketFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)
    userFactory = moduleRef.get(UserFactory)
    profileFactory = moduleRef.get(ProfileFactory)
    usersOnProfilesFactory = moduleRef.get(UsersOnProfilesFactory)
    departmentFactory = moduleRef.get(DepartmentFactory)
    eventFactory = moduleRef.get(EventFactory)
    eventLotFactory = moduleRef.get(EventLotFactory)
    eventPurchaseFactory = moduleRef.get(EventPurchaseFactory)
    eventTicketFactory = moduleRef.get(EventTicketFactory)

    await app.init()
  })

  test('[POST] /order/manual/:transactionId', async () => {
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
      buyerId: user.id,
    })

    const eventTicket = await eventTicketFactory.makePrismaEventTicket({
      eventPurchaseId: eventPurchase.id,
      eventLotId: eventLot.id,
    })

    const response = await request(app.getHttpServer())
      .post(`/order/manual/${eventPurchase.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .attach('file', './test/e2e/sample-upload.png')

    expect(response.statusCode).toBe(HttpStatus.CREATED)

    const orderOnDatabase = await prisma.order.findFirst({
      where: {
        transactionId: eventTicket.id,
      },
    })

    expect(orderOnDatabase).not.toBeNull()
    expect(orderOnDatabase.status).toBe(OrderStatus.WAITING_CONFIRMATION)
  })
})
