import { HttpStatus, INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { DepartmentFactory } from 'test/factories/make-department'
import { ProfileFactory } from 'test/factories/make-profile'
import { ProfilePermissionFactory } from 'test/factories/make-profile-permission'
import { UserFactory } from 'test/factories/make-user'

import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

describe('Create Profile Permission (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService
  let profileFactory: ProfileFactory
  let departmentFactory: DepartmentFactory
  let userFactory: UserFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [
        ProfileFactory,
        ProfilePermissionFactory,
        DepartmentFactory,
        UserFactory,
      ],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)
    profileFactory = moduleRef.get(ProfileFactory)
    departmentFactory = moduleRef.get(DepartmentFactory)
    userFactory = moduleRef.get(UserFactory)

    await app.init()
  })

  test('[POST] /profile/profile-permission/:id', async () => {
    const profile = await profileFactory.makePrismaProfile()
    const department = await departmentFactory.makePrismaDepartment()

    const user = await userFactory.makePrismaUser({
      name: 'John Doe',
      profileId: profile.id,
      departmentId: department.id,
    })

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const response = await request(app.getHttpServer())
      .post('/profile/profile-permission')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        key: 'create.profile.id',
        profileId: profile.id,
      })

    expect(response.statusCode).toBe(HttpStatus.CREATED)

    const profilePermissionOnDatabase =
      await prisma.profilePermission.findFirst({
        where: {
          key: 'create.profile.id',
          profileId: profile.id,
        },
      })

    expect(profilePermissionOnDatabase).toBeTruthy()
  })
})
