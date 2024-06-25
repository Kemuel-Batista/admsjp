import { HttpStatus, INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { DepartmentFactory } from 'test/factories/make-department'
import { EventFactory } from 'test/factories/make-event'
import { ProfileFactory } from 'test/factories/make-profile'
import { UserFactory } from 'test/factories/make-user'

import {
  EventStatus,
  EventType,
  EventVisible,
} from '@/domain/admsjp/enums/event'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Edit event (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService
  let profileFactory: ProfileFactory
  let departmentFactory: DepartmentFactory
  let userFactory: UserFactory
  let eventFactory: EventFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [ProfileFactory, DepartmentFactory, UserFactory, EventFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)
    profileFactory = moduleRef.get(ProfileFactory)
    departmentFactory = moduleRef.get(DepartmentFactory)
    userFactory = moduleRef.get(UserFactory)
    eventFactory = moduleRef.get(EventFactory)

    await app.init()
  })

  test('[PUT] /events/:eventId', async () => {
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

    const response = await request(app.getHttpServer())
      .put(`/events/${event.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Updating Event',
        description: 'Updating description',
        status: EventStatus.ACTIVE,
        visible: EventVisible.INVISIBLE,
        eventType: EventType.HIBRIDO,
        message: 'Nothing',
      })

    expect(response.statusCode).toBe(HttpStatus.NO_CONTENT)

    const eventOnDatabase = await prisma.event.findUnique({
      where: {
        id: event.id,
      },
    })

    expect(eventOnDatabase).not.toBeNull()
    expect(eventOnDatabase.title).toEqual('Updating Event')
    expect(eventOnDatabase.status).toEqual(EventStatus.ACTIVE)
  })
})
