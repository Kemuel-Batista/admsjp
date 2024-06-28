import { randomUUID } from 'node:crypto'

import { faker } from '@faker-js/faker'
import { Department, PrismaClient, User } from '@prisma/client'
import { config } from 'dotenv'

import {
  EventPixType,
  EventStatus,
  EventType,
  EventVisible,
} from '@/domain/admsjp/enums/event'
import { EventLotStatus, EventLotType } from '@/domain/admsjp/enums/event-lot'
import {
  ParameterStatus,
  ParameterVisible,
} from '@/domain/admsjp/enums/parameter'
import { UserStatus } from '@/domain/admsjp/enums/user'
import { BcryptHasher } from '@/infra/cryptography/brcrypt-hasher'
import { envSchema } from '@/infra/env/env'

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
        name: 'GENERAL',
      },
      create: {
        name: 'GENERAL',
        status: 1,
        visible: 1,
        createdBy: randomUUID(),
        updatedBy: randomUUID(),
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

    const randomUser = randomUUID()

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
        createdBy: randomUser,
      },
      update: {},
    })

    await prisma.department.upsert({
      where: {
        name: 'GENERAL',
      },
      create: {
        name: 'GENERAL',
        description: 'Todos os usuários públicos',
        status: 1,
        visible: 1,
        createdBy: randomUser,
      },
      update: {},
    })

    console.timeEnd('createDepartment')

    return department
  }

  async function createAdmin(): Promise<User> {
    console.time('createAdmin')

    const randomUser = randomUUID()

    const hashedPassword = await bcryptHasher.hash(env.ADMIN_PASSWORD)

    const profileAdmin = await prisma.profile.upsert({
      where: {
        name: 'ADMIN',
      },
      create: {
        name: 'ADMIN',
        status: 0,
        visible: 0,
        createdBy: randomUser,
      },
      update: {},
    })

    const adminDepartment = await prisma.department.upsert({
      where: {
        name: 'ADMINISTRACAO',
      },
      create: {
        name: 'ADMINISTRACAO',
        description: 'Administração',
        status: 1,
        visible: 0,
        createdBy: randomUser,
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
        createdBy: randomUser,
        UsersOnProfiles: {
          create: {
            profileId: profileAdmin.id,
          },
        },
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
        description: `Estamos animados para convidá-lo para a EBJ 2024, um evento dedicado aos jovens, que acontecerá nos dias 18, 19 e 20 de julho. Com o tema "Intimidade: Geração que Anseia pela Presença", nosso objetivo é promover um encontro profundo com Deus, através de palestras edificantes e momentos de adoração.

#### Palestrantes Convidados:
- Pastor Rômulo Tavares
- Pastor Anderson Predes
- André Santana
- Keila Guimarães

#### Cronograma de Horários:

Quinta-feira (18/07):
- Início: 19h30
- Término: 21h30

Sexta-feira (19/07):
- Início: 19h30
- Término: 21h30

Sábado (20/07):
- Início das Palestras Individuais: 18h00
- Lanche: 18h50 - 19h20
- Início da Sessão Noturna: 19h30
- Término: 21h30

Junte-se a nós para três dias de ensinamentos transformadores e experiências espirituais que fortalecerão sua fé e sua conexão com Deus. Venha fazer parte de uma geração que busca intensamente a presença divina. Não perca essa oportunidade única de crescimento e comunhão. Esperamos por você!`,
        pixKey: '07.877.646/0001-09',
        pixType: EventPixType.CNPJ,
        initialDate: new Date('2024-07-18T19:30:00'),
        finalDate: new Date('2024-07-20T18:00:00'),
        status: EventStatus.ACTIVE,
        visible: EventVisible.VISIBLE,
        departmentId: admin.departmentId,
        eventType: EventType.PRESENCIAL,
        imagePath: 'banner-ebj-umadsjp.png',
        createdBy: admin.id,
      },
      update: {},
    })

    await prisma.eventLot.create({
      data: {
        name: 'Inscrição EBJ',
        description: 'Lote de inscrição da EBJ',
        lot: 1,
        quantity: 300,
        status: EventLotStatus.ACTIVE,
        value: 1999,
        eventId: event.id,
        fulfilledQuantity: 0,
        createdBy: admin.id,
      },
    })

    await prisma.eventLot.create({
      data: {
        name: 'Inscrição EBJ + Camiseta UMADSJP',
        description: 'Lote de inscrição da EBJ + Compra da camiseta UMADSJP',
        lot: 2,
        quantity: 50,
        type: EventLotType.SHIRT,
        status: EventLotStatus.ACTIVE,
        value: 6499,
        eventId: event.id,
        fulfilledQuantity: 0,
        createdBy: admin.id,
      },
    })

    await prisma.eventAddress.upsert({
      where: {
        id: randomUUID(),
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
