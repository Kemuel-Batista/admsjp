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

describe('Delete Profile Permission by ID (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService
  let profileFactory: ProfileFactory
  let profilePermissionFactory: ProfilePermissionFactory
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
    profilePermissionFactory = moduleRef.get(ProfilePermissionFactory)
    departmentFactory = moduleRef.get(DepartmentFactory)
    userFactory = moduleRef.get(UserFactory)

    await app.init()
  })

  test('[DELETE] /profile/profile-permission/:id', async () => {
    const profile = await profileFactory.makePrismaProfile()
    const department = await departmentFactory.makePrismaDepartment()

    const user = await userFactory.makePrismaUser({
      name: 'John Doe',
      profileId: profile.id,
      departmentId: department.id,
    })

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const profilePermission =
      await profilePermissionFactory.makePrismaProfilePermission({
        profileId: profile.id,
        createdBy: user.id,
      })

    const profilePermissionId = profilePermission.id

    const response = await request(app.getHttpServer())
      .delete(`/profile/profile-permission/${profilePermissionId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(HttpStatus.NO_CONTENT)

    const profilePermissionOnDatabase =
      await prisma.profilePermission.findUnique({
        where: {
          id: profilePermissionId,
        },
      })

    expect(profilePermissionOnDatabase).toBeNull()
  })
})
