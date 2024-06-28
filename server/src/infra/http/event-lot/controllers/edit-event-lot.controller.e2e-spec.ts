import { HttpStatus, INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { DepartmentFactory } from 'test/factories/make-department'
import { EventFactory } from 'test/factories/make-event'
import { EventLotFactory } from 'test/factories/make-event-lot'
import { ProfileFactory } from 'test/factories/make-profile'
import { UserFactory } from 'test/factories/make-user'
import { UsersOnProfilesFactory } from 'test/factories/make-users-on-profiles'

import { EventType } from '@/domain/admsjp/enums/event'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
describe('Update Event Lot (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService
  let userFactory: UserFactory
  let profileFactory: ProfileFactory
  let usersOnProfilesFactory: UsersOnProfilesFactory
  let departmentFactory: DepartmentFactory
  let eventFactory: EventFactory
  let eventLotFactory: EventLotFactory

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

    await app.init()
  })

  test('[PUT] /events/lot', async () => {
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
      eventType: EventType.PRESENCIAL,
      departmentId: department.id,
      createdBy: user.id,
    })

    const eventLot = await eventLotFactory.makePrismaEventLot({
      eventId: event.id,
    })

    const response = await request(app.getHttpServer())
      .put('/events/lot')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        id: eventLot.id,
        eventId: eventLot.eventId,
        lot: eventLot.lot,
        quantity: 100,
        value: eventLot.value,
        status: eventLot.status,
      })

    expect(response.statusCode).toBe(HttpStatus.NO_CONTENT)

    const eventLotOnDatabase = await prisma.eventLot.findUnique({
      where: {
        id: eventLot.id,
      },
    })

    expect(eventLotOnDatabase.quantity).toBe(100)
  })
})
