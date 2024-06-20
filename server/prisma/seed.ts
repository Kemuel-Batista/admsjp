import { randomUUID } from 'node:crypto'

import { faker } from '@faker-js/faker'
import { Department, PrismaClient, User } from '@prisma/client'
import { config } from 'dotenv'

import {
  EventStatus,
  EventType,
  EventVisible,
} from '@/domain/admsjp/enums/event'
import { EventLotStatus } from '@/domain/admsjp/enums/event-lot'
import {
  ParameterStatus,
  ParameterVisible,
} from '@/domain/admsjp/enums/parameter'
import { UserStatus } from '@/domain/admsjp/enums/user'
import { BcryptHasher } from '@/infra/cryptography/brcrypt-hasher'
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
const bcryptHasher = new BcryptHasher()

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

    await createDepartment()
  }

  if (enviroment === 'development') {
    await clearDatabase()

    await createDepartment()

    await createEvent(admin)

    await createParameters(admin)

    await prisma.profile.upsert({
      where: {
        name: 'General',
      },
      create: {
        name: 'General',
        status: 1,
        visible: 1,
        createdBy: 0,
        updatedBy: 0,
      },
      update: {},
    })
    // await createFakeUsers()
  }

  async function clearDatabase(): Promise<void> {
    console.table({
      Aviso:
        'O script clearDatabase() será executado e irá apagar todos os dados do banco de dados.',
      Ação: 'Pressione Ctrl + C para cancelar a execução.',
    })

    console.log()
    console.log('TODOS OS DADOS SERÃO EXCLUÍDOS EM 3 SEGUNDOS.')
    console.log('Pressione Ctrl + C para cancelar a execução.')
    console.log()

    for (let i = 3; i > 0; i--) {
      console.log(`Iniciando exclusão do banco de dados em ${i}`)
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    console.log()

    console.time('clearDatabase')

    await prisma.userToken.deleteMany()

    await prisma.user.deleteMany({
      where: {
        email: {
          not: env.ADMIN_EMAIL,
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

    await prisma.department.upsert({
      where: {
        name: 'General',
      },
      create: {
        name: 'General',
        description: 'Todos os usuários públicos',
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

    const hashedPassword = await bcryptHasher.hash(env.ADMIN_PASSWORD)

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
        email: env.ADMIN_EMAIL,
      },
      create: {
        email: env.ADMIN_EMAIL,
        name: env.ADMIN_NAME,
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

      const password = await bcryptHasher.hash(username)

      await prisma.user.upsert({
        where: {
          email,
        },
        create: {
          email,
          name: `${name} ${lastName}`,
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
          email: {
            not: env.ADMIN_EMAIL,
          },
        },
      })
    }

    console.timeEnd('createFakeUsers')
  }

  async function createEvent(admin: User): Promise<void> {
    console.time('createEvent')

    const event = await prisma.event.upsert({
      where: {
        title: 'EBJ 2024',
      },
      create: {
        title: 'EBJ 2024',
        slug: 'umadsjp-ebj-2024',
        description: `ENCOEBD/EBOJ 2024 - Encontro da Escola Bíblica Dominical e Escola Bíblica de Obreiros de Joinville\n

        A IEADJO - Igreja Evangélica Assembleia de Deus de Joinville (SC) promove dois importantes eventos em uma mesma data, trata-se de uma parceria envolvendo o Departamento de Escola Bíblica Dominical e o Departamento do CCOM (Centro de Capacitação e Orientação Ministerial).\n
        São eles: ENCOEBD (ENCONTRO DA ESCOLA BÍBLICA DOMINICAL ) e EBOJ (ESCOLA BÍBLICA DE OBREIROS EM JOINVILLE), e será realizado nos dias 20 a 22 de Junho de 2024 (Quinta, Sexta e Sábado) em reuniões presenciais no Centreventos IEADJO - Assembleia de Deus Joinville.\n
        Estr. Arataca, 965 - São Marcos, Joinville - SC, 89214-363.\n\n
        
        O tema geral do evento é Conduzidos pelo Espírito Santo. As disciplinas do currículo permanente da ENCOEBD/EBOJ estarão baseadas no tema da IEAD JO e da CIADESCP para o ano de 2024.\n
        
        Disciplinas:\n
        
        - Teologia Pastoral;\n
        - Homilética;\n
        - Hermenêutica;\n
        - Missiologia;\n
        - Bibliologia;\n
        - Teologia Sistemática.\n
        
        Informações gerais:\n
        
        Quinta-feira dia 20/06\n
        Noite: 19h00 às 21h30\n
        
        Sexta-feira dia 21/06\n
        Noite: 19h00 às 21h30\n
        
        Sábado dia 22/06\n
        Manhã: 09h00 às 12h00\n
        Tarde: 14h00 às 17h30\n
        Noite: 17h00 às 21h30\n
        
        > MAIORES INFORMAÇÕES\n
        Whatsapp: +55 47 99743-4047 (Pr. Eduardo Sônego)`,

        initialDate: faker.date.soon(),
        finalDate: faker.date.future(),
        status: EventStatus.ACTIVE,
        visible: EventVisible.VISIBLE,
        departmentId: 1,
        eventType: EventType.PRESENCIAL,
        imagePath: '614e5ac8-7453-4d05-bf56-4fa733a0892b-ferraro.webp',
        createdBy: admin.id,
      },
      update: {},
    })

    await prisma.eventLot.upsert({
      where: {
        eventId_lot: {
          eventId: event.id,
          lot: 1,
        },
      },
      create: {
        name: 'Inscrição EBJ',
        description: 'Lote de inscrição da EBJ',
        lot: 1,
        quantity: 50,
        status: EventLotStatus.ACTIVE,
        value: 2200,
        eventId: event.id,
        fulfilledQuantity: 0,
        createdBy: admin.id,
      },
      update: {},
    })

    await prisma.eventLot.upsert({
      where: {
        eventId_lot: {
          eventId: event.id,
          lot: 2,
        },
      },
      create: {
        name: 'Inscrição EBJ + Camisa UMADSJP',
        description: 'Lote de inscrição da EBJ + Compra da camisa UMADSJP',
        lot: 2,
        quantity: 50,
        status: EventLotStatus.ACTIVE,
        value: 7000,
        eventId: event.id,
        fulfilledQuantity: 0,
        createdBy: admin.id,
      },
      update: {},
    })

    await prisma.eventAddress.upsert({
      where: {
        uuid: randomUUID(),
      },
      create: {
        street: 'Rua joinville',
        number: '2375',
        complement: '',
        neighborhood: 'Pedro Moro',
        state: 41, // https://servicodados.ibge.gov.br/api/v1/localidades/estados
        city: 4125506, // https://servicodados.ibge.gov.br/api/v1/localidades/estados/41/municipios
        eventId: event.id,
        latitude: -25.5471032,
        longitude: -49.202677,
        createdBy: admin.id,
      },
      update: {},
    })

    console.timeEnd('createEvent')
  }

  async function createParameters(admin: User): Promise<void> {
    console.time('createParameters')

    await prisma.parameter.upsert({
      where: {
        key: 'order.payment.type',
      },
      create: {
        key: 'order.payment.type',
        keyInfo:
          'Parâmetro para verificar o tipo de pagamento a ser utilizado no sistema',
        value: 'manual',
        createdBy: admin.id,
        status: ParameterStatus.ACTIVE,
        visible: ParameterVisible.VISIBLE,
      },
      update: {},
    })

    console.timeEnd('createParameters')
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
