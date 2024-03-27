import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { ChurchFactory } from 'test/factories/make-church'
import { DepartmentFactory } from 'test/factories/make-department'
import { UserFactory } from 'test/factories/make-user'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Save Church Department (E2E)', () => {
  let app: INestApplication
  let jwt: JwtService
  let prisma: PrismaService
  let userFactory: UserFactory
  let churchFactory: ChurchFactory
  let departmentFactory: DepartmentFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [UserFactory, ChurchFactory, DepartmentFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    jwt = moduleRef.get(JwtService)
    prisma = moduleRef.get(PrismaService)
    userFactory = moduleRef.get(UserFactory)
    churchFactory = moduleRef.get(ChurchFactory)
    departmentFactory = moduleRef.get(DepartmentFactory)

    await app.init()
  })

  test('[POST] /admsjp/churchs/:churchId/department', async () => {
    const user = await userFactory.makePrismaUser()
    const accessToken = jwt.sign({ sub: user.id.toString() })

    const church = await churchFactory.makePrismaChurch()
    const churchId = church.id.toString()

    const department = await departmentFactory.makePrismaDepartment()
    const departmentId = department.id.toString()

    const result = await request(app.getHttpServer())
      .post(`/admsjp/churchs/${churchId}/department`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        departmentId,
        members: [
          {
            name: 'Kemuel',
            functionName: 'Pastor',
            subFunction: 'Cooperador',
            phone: '123456789',
            email: 'joao@example.com',
            birthday: '2003-01-01T00:00:00.000Z',
          },
        ],
      })

    expect(result.statusCode).toBe(201)

    const churchDepartmentOnDatabase = await prisma.churchDepartment.findFirst({
      where: {
        churchId,
        departmentId,
      },
    })

    expect(churchDepartmentOnDatabase).toBeTruthy()
    expect(churchDepartmentOnDatabase).toHaveLength(1)
  })
})
