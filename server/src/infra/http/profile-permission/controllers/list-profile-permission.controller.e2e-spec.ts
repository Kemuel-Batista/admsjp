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

describe('List Profile Permission (E2E)', () => {
  let app: INestApplication
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
    jwt = moduleRef.get(JwtService)
    profileFactory = moduleRef.get(ProfileFactory)
    profilePermissionFactory = moduleRef.get(ProfilePermissionFactory)
    departmentFactory = moduleRef.get(DepartmentFactory)
    userFactory = moduleRef.get(UserFactory)

    await app.init()
  })

  test('[GET] /profile/profile-permission/by-profile-id/:profileId', async () => {
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

    const response = await request(app.getHttpServer())
      .get('/profile/profile-permission')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(HttpStatus.OK)
    expect(response.body).toEqual({
      profilePermissions: expect.arrayContaining([
        expect.objectContaining({
          key: profilePermission.key,
          profileId: profilePermission.profileId,
        }),
      ]),
    })
  })
})
