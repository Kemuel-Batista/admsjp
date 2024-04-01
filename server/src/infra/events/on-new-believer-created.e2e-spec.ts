import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { ChurchFactory } from 'test/factories/make-church'
import { waitFor } from 'test/utils/wait-for'
import { expect } from 'vitest'

import { DomainEvents } from '@/core/events/domain-events'

import { AppModule } from '../app.module'
import { DatabaseModule } from '../database/database.module'
import { PrismaService } from '../database/prisma/prisma.service'

describe('On New Believer Created (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let churchFactory: ChurchFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [ChurchFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    churchFactory = moduleRef.get(ChurchFactory)

    DomainEvents.shouldRun = true

    await app.init()
  })

  it('should send a notification when new believer is created', async () => {
    const church = await churchFactory.makePrismaChurch()
    const churchId = church.id.toString()

    await request(app.getHttpServer()).post('/admsjp/believer').send({
      churchId,
      name: 'Kemuel',
      lastName: 'Batista',
      phone: '+5581989943240',
      email: 'kemuellima20@gmail.com',
      birthday: '2003-01-01T00:00:00.000Z',
      street: 'Rua Joinville',
      neighborhood: 'Pedro Moro',
      city: 'SJP',
      state: 'PR',
      postalCode: '45678978',
      number: '755',
      lgpd: true,
    })

    await waitFor(async () => {
      const notificationOnDatabase = await prisma.notification.findFirst({
        where: {
          title: 'Bem-vindo a ADMSJP',
        },
      })

      expect(notificationOnDatabase).not.toBeNull()
    })
  })
})
