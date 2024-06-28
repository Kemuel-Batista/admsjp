import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { DepartmentFactory } from 'test/factories/make-department'
import { EventFactory } from 'test/factories/make-event'
import { EventLotFactory } from 'test/factories/make-event-lot'
import { ProfileFactory } from 'test/factories/make-profile'
import { UserFactory } from 'test/factories/make-user'
import { UsersOnProfilesFactory } from 'test/factories/make-users-on-profiles'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Get event by id (E2E)', () => {
  let app: INestApplication
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

    jwt = moduleRef.get(JwtService)
    userFactory = moduleRef.get(UserFactory)
    profileFactory = moduleRef.get(ProfileFactory)
    usersOnProfilesFactory = moduleRef.get(UsersOnProfilesFactory)
    departmentFactory = moduleRef.get(DepartmentFactory)
    eventFactory = moduleRef.get(EventFactory)
    eventLotFactory = moduleRef.get(EventLotFactory)

    await app.init()
  })

  test('[GET] /events/lot/event/:id', async () => {
    const profile = await profileFactory.makePrismaProfile()
    const department = await departmentFactory.makePrismaDepartment()

    const user = await userFactory.makePrismaUser({
      name: 'John Doe',
      departmentId: department.id,
    })

    await usersOnProfilesFactory.makePrismaUsersOnProfiles({
      profileId: profile.id,
      userId: user.id,
    })

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const event = await eventFactory.makePrismaEvent({
      departmentId: department.id,
      createdBy: user.id,
    })

    await Promise.all([
      eventLotFactory.makePrismaEventLot({
        eventId: event.id,
        lot: 1,
      }),
      eventLotFactory.makePrismaEventLot({
        eventId: event.id,
        lot: 2,
      }),
    ])

    const response = await request(app.getHttpServer())
      .get(`/events/lot/event/${event.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          lot: 1,
        }),
        expect.objectContaining({
          lot: 2,
        }),
      ]),
    )
  })
})
