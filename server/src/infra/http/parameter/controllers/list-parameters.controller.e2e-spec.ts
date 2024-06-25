import { HttpStatus, INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { DepartmentFactory } from 'test/factories/make-department'
import { ParameterFactory } from 'test/factories/make-parameter'
import { ProfileFactory } from 'test/factories/make-profile'
import { UserFactory } from 'test/factories/make-user'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'

describe('List parameters (E2E)', () => {
  let app: INestApplication
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
    jwt = moduleRef.get(JwtService)
    profileFactory = moduleRef.get(ProfileFactory)
    departmentFactory = moduleRef.get(DepartmentFactory)
    userFactory = moduleRef.get(UserFactory)
    parameterFactory = moduleRef.get(ParameterFactory)

    await app.init()
  })

  test('[GET] /parameter', async () => {
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
      .get('/parameter')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(HttpStatus.OK)
    expect(response.body).toEqual({
      parameters: expect.arrayContaining([
        expect.objectContaining({
          id: parameter.id,
          key: parameter.key,
          value: parameter.value,
        }),
      ]),
    })
  })
})
