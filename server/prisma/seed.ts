import { faker } from '@faker-js/faker'
import { Department, PrismaClient, User } from '@prisma/client'
import { config } from 'dotenv'

import BCryptHashProvider from '@/domain/user/cryptography/implementations/brcrypt-hash-provider'
import { UserStatus } from '@/domain/user/enums/user-status'
import { envSchema } from '@/infra/env/env'

const permissions = [
  'system.profile.list',
  'system.profile.create',
  'system.profile.update',
  'system.profile.delete.by-id',
  'system.profile.permission.list',
  'system.profile.permission.find.by-id',
  'system.profile.permission.list.by-profile-id',
  'system.profile.permission.create',
  'system.profile.permission.update',
  'system.profile.permission.delete.by-id',
  'system.user.list',
  'system.user.create',
  'system.user.update',
  'system.user.update.password',
  'system.user.update.self-password',
  'system.user.patch.status',
  'system.user.delete.by-id',
  'system.user.permission.list.by-user-name',
  'admsjp.churchs.list',
  'admsjp.churchs.find.by-id',
  'admsjp.churchs.create',
  'admsjp.churchs.update',
  'admsjp.churchs.delete.by-id',
  'admsjp.departments.list',
  'admsjp.departments.find.by-id',
  'admsjp.departments.create',
  'admsjp.departments.update',
  'admsjp.departments.delete.by-id',
  'umadsjp.meeting.list',
  'umadsjp.meeting.find.by-id',
  'umadsjp.meeting.create',
  'umadsjp.meeting.update',
  'umadsjp.meeting.delete.by-id',
  'umadsjp.leaders.list',
  'umadsjp.leaders.find.by-id',
  'umadsjp.leaders.create',
  'umadsjp.leaders.update',
  'umadsjp.leaders.delete.by-id',
  'umadsjp.young-people.list.by-church-id',
  'umadsjp.young-people.find.by-id',
  'umadsjp.young-people.create.by-church-id',
  'umadsjp.young-people.update',
  'umadsjp.young-people.delete.by-id',
]

const prisma = new PrismaClient()
const bcryptHashProvider = new BCryptHashProvider()

config({ path: '.env', override: true })

const env = envSchema.parse(process.env)

async function main(): Promise<void> {
  const enviroment = process.env.NODE_ENV

  console.table({
    NODE_ENV: enviroment,
    Aviso: 'Verifique se o ambiente está correto antes de continuar.',
  })

  console.time('Seed executada em')
  await execute(enviroment)
  console.log()
  console.timeEnd('Seed executada em')
}

async function execute(enviroment: string): Promise<void> {
  const admin = await createAdmin()

  // if (enviroment === 'production') {}

  if (enviroment === 'deploy') {
    await clearDatabase()
  }

  if (enviroment === 'development') {
    await clearDatabase()
    // await createFakeUsers()
  }

  async function clearDatabase(): Promise<void> {
    console.table({
      Aviso:
        'O script clearDatabase() será executado e irá apagar todos os dados do banco de dados.',
      Ação: 'Pressione Ctrl + C para cancelar a execução.',
    })

    console.log()
    console.log('TODOS OS DADOS SERÃO EXCLUÍDOS EM 10 SEGUNDOS.')
    console.log('Pressione Ctrl + C para cancelar a execução.')
    console.log()

    for (let i = 10; i > 0; i--) {
      console.log(`Iniciando exclusão do banco de dados em ${i}`)
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    console.log()

    console.time('clearDatabase')

    await prisma.userToken.deleteMany()

    await prisma.user.deleteMany({
      where: {
        username: {
          not: env.ADMIN_USERNAME,
        },
      },
    })

    console.timeEnd('clearDatabase')
  }

  async function createDepartment(): Promise<Department> {
    console.time('createDepartment')

    const department = await prisma.department.upsert({
      where: {
        name: 'UMADJSP',
      },
      create: {
        name: 'UMADJSP',
        description:
          'Departamento de Jovens da Assembléia de Deus São José dos Pinhais',
        status: 1,
        visible: 1,
        createdBy: 0,
        updatedBy: 0,
      },
      update: {},
    })

    console.timeEnd('createDepartment')

    return department
  }

  async function createAdmin(): Promise<User> {
    console.time('createAdmin')

    const hashedPassword = await bcryptHashProvider.generateHash(
      env.ADMIN_PASSWORD,
    )

    const profileAdmin = await prisma.profile.upsert({
      where: {
        name: 'Administrador',
      },
      create: {
        name: 'Administrador',
        status: 0,
        visible: 0,
        createdBy: 0,
        updatedBy: 0,
      },
      update: {},
    })

    for (const permission of permissions) {
      await prisma.profilePermission.upsert({
        where: {
          KeyProfileId: { key: permission, profileId: profileAdmin.id },
        },
        create: {
          key: permission,
          profileId: profileAdmin.id,
          createdBy: 0,
          updatedBy: 0,
        },
        update: {},
      })
    }

    const adminDepartment = await prisma.department.upsert({
      where: {
        name: 'ADMINISTRACAO',
      },
      create: {
        name: 'ADMINISTRACAO',
        description: 'Administração',
        status: 1,
        visible: 0,
        createdBy: 0,
        updatedBy: 0,
      },
      update: {},
    })

    const admin = await prisma.user.upsert({
      where: {
        username: env.ADMIN_USERNAME,
      },
      create: {
        username: env.ADMIN_USERNAME,
        name: env.ADMIN_NAME,
        email: env.ADMIN_EMAIL,
        password: hashedPassword,
        departmentId: adminDepartment.id,
        status: UserStatus.ACTIVE,
        profileId: profileAdmin.id,
        createdBy: 0,
        updatedBy: 0,
      },
      update: {},
    })

    console.timeEnd('createAdmin')

    return admin
  }

  async function createFakeUsers(flagDeleteUsers = false): Promise<void> {
    console.time('createFakeUsers')

    const department = await createDepartment()

    for (let index = 0; index < 5; index++) {
      const name = faker.person.firstName()
      const lastName = faker.person.lastName()
      const email = faker.internet.email()

      const username = faker.internet.userName({
        firstName: name,
        lastName,
      })

      const password = await bcryptHashProvider.generateHash(username)

      await prisma.user.upsert({
        where: {
          username,
        },
        create: {
          username,
          name: `${name} ${lastName}`,
          email,
          password,
          departmentId: department.id,
          status: UserStatus.ACTIVE,
          createdBy: admin.id,
          updatedBy: admin.id,
        },
        update: {},
      })
    }

    if (flagDeleteUsers) {
      await prisma.user.deleteMany({
        where: {
          username: {
            not: 'admin',
          },
        },
      })
    }

    console.timeEnd('createFakeUsers')
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
