import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Create Church (E2E)', () => {
  let app: INestApplication
  let jwt: JwtService
  let prisma: PrismaService
  let userFactory: UserFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    jwt = moduleRef.get(JwtService)
    prisma = moduleRef.get(PrismaService)
    userFactory = moduleRef.get(UserFactory)

    await app.init()
  })

  test('[POST] /admsjp/churchs', async () => {
    const user = await userFactory.makePrismaUser()
    const accessToken = jwt.sign({ sub: user.id.toString() })

    const result = await request(app.getHttpServer())
      .post('/admsjp/churchs')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Sede',
        description: 'Igreja Sede',
        street: 'Rua Joinville',
        neighborhood: 'Pedro Moro',
        city: 'SJP',
        state: 'PR',
        postalCode: '45678978',
        number: '755',
        latitude: -27.2092052,
        longitude: -49.6401091,
      })

    expect(result.statusCode).toBe(201)

    const churchOnDatabase = await prisma.church.findUnique({
      where: {
        username: 'admsjp.sede',
      },
    })

    expect(churchOnDatabase).toBeTruthy()
  })
})
