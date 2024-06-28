import { HttpStatus, INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { DepartmentFactory } from 'test/factories/make-department'
import { EventFactory } from 'test/factories/make-event'
import { EventAddressFactory } from 'test/factories/make-event-address'
import { ProfileFactory } from 'test/factories/make-profile'
import { UserFactory } from 'test/factories/make-user'
import { UsersOnProfilesFactory } from 'test/factories/make-users-on-profiles'

import { EventType } from '@/domain/admsjp/enums/event'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('Get Event Address by Event ID (E2E)', () => {
  let app: INestApplication
  let jwt: JwtService
  let userFactory: UserFactory
  let profileFactory: ProfileFactory
  let usersOnProfilesFactory: UsersOnProfilesFactory
  let departmentFactory: DepartmentFactory
  let eventFactory: EventFactory
  let eventAddressFactory: EventAddressFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        UserFactory,
        ProfileFactory,
        UsersOnProfilesFactory,
        DepartmentFactory,
        EventFactory,
        EventAddressFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    jwt = moduleRef.get(JwtService)
    userFactory = moduleRef.get(UserFactory)
    profileFactory = moduleRef.get(ProfileFactory)
    usersOnProfilesFactory = moduleRef.get(UsersOnProfilesFactory)
    departmentFactory = moduleRef.get(DepartmentFactory)
    eventFactory = moduleRef.get(EventFactory)
    eventAddressFactory = moduleRef.get(EventAddressFactory)

    await app.init()
  })

  test('[GET] /events/address/event/:id', async () => {
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

    const eventAddress = await eventAddressFactory.makePrismaEventAddress({
      eventId: event.id,
    })

    const response = await request(app.getHttpServer())
      .get(`/events/address/event/${event.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(HttpStatus.OK)
    expect(response.body).toEqual({
      event: expect.objectContaining({
        street: eventAddress.street,
        number: eventAddress.number,
      }),
    })
  })
})
