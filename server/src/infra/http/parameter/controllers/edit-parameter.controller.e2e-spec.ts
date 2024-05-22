import { HttpStatus, INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { DepartmentFactory } from 'test/factories/make-department'
import { ParameterFactory } from 'test/factories/make-parameter'
import { ProfileFactory } from 'test/factories/make-profile'
import { UserFactory } from 'test/factories/make-user'

import {
  ParameterStatus,
  ParameterVisible,
} from '@/domain/admsjp/enums/parameter'
import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Edit parameter (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService
  let profileFactory: ProfileFactory
  let departmentFactory: DepartmentFactory
  let userFactory: UserFactory
  let parameterFactory: ParameterFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        ProfileFactory,
        DepartmentFactory,
        UserFactory,
        ParameterFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)
    profileFactory = moduleRef.get(ProfileFactory)
    departmentFactory = moduleRef.get(DepartmentFactory)
    userFactory = moduleRef.get(UserFactory)
    parameterFactory = moduleRef.get(ParameterFactory)

    await app.init()
  })

  test('[PUT] /parameter/:id', async () => {
    const profile = await profileFactory.makePrismaProfile()
    const department = await departmentFactory.makePrismaDepartment()

    const user = await userFactory.makePrismaUser({
      name: 'John Doe',
      profileId: profile.id,
      departmentId: department.id,
    })

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const parameter = await parameterFactory.makePrismaParameter()

    const response = await request(app.getHttpServer())
      .put(`/parameter/${parameter.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        key: 'order.payment.type',
        keyInfo:
          'Parâmetro para verificar o tipo de pagamento a ser utilizado no sistema',
        value: 'manual',
        createdBy: user.id,
        status: ParameterStatus.ACTIVE,
        visible: ParameterVisible.VISIBLE,
      })

    expect(response.statusCode).toBe(HttpStatus.CREATED)

    const parameterOnDatabase = await prisma.parameter.findUnique({
      where: {
        id: parameter.id,
      },
    })

    expect(parameterOnDatabase).not.toBeNull()
    expect(parameterOnDatabase.key).toEqual('order.payment')
  })
})
