import { HttpStatus, INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { DepartmentFactory } from 'test/factories/make-department'
import { EventFactory } from 'test/factories/make-event'
import { EventAddressFactory } from 'test/factories/make-event-address'
import { ProfileFactory } from 'test/factories/make-profile'
import { UserFactory } from 'test/factories/make-user'

import { EventType } from '@/domain/admsjp/enums/event'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
describe('Update Event Address (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService
  let profileFactory: ProfileFactory
  let departmentFactory: DepartmentFactory
  let userFactory: UserFactory
  let eventFactory: EventFactory
  let eventAddressFactory: EventAddressFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        ProfileFactory,
        DepartmentFactory,
        UserFactory,
        EventFactory,
        EventAddressFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)
    profileFactory = moduleRef.get(ProfileFactory)
    departmentFactory = moduleRef.get(DepartmentFactory)
    userFactory = moduleRef.get(UserFactory)
    eventFactory = moduleRef.get(EventFactory)
    eventAddressFactory = moduleRef.get(EventAddressFactory)

    await app.init()
  })

  test('[PUT] /events/address/:id', async () => {
    const profile = await profileFactory.makePrismaProfile()
    const department = await departmentFactory.makePrismaDepartment()

    const user = await userFactory.makePrismaUser({
      name: 'John Doe',
      profileId: profile.id,
      departmentId: department.id,
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
      .get(`/events/address/${eventAddress.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        street: 'Rua do teste',
      })

    expect(response.statusCode).toBe(HttpStatus.NO_CONTENT)

    const eventAddressOnDatabase = await prisma.eventAddress.findUnique({
      where: {
        id: eventAddress.id,
      },
    })

    expect(eventAddressOnDatabase.street).toBe('Rua do teste')
  })
})
