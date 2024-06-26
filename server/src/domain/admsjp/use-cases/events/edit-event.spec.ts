import { makeEvent } from 'test/factories/make-event'
import { makeUser } from 'test/factories/make-user'
import { FakeMailNotifier } from 'test/notifier/fake-mail-notifier'
import { InMemoryEventLotsRepository } from 'test/repositories/in-memory-event-lots-repository'
import { InMemoryEventPurchasesRepository } from 'test/repositories/in-memory-event-purchases-repository'
import { InMemoryEventTicketsRepository } from 'test/repositories/in-memory-event-tickets-repository'
import { InMemoryEventsRepository } from 'test/repositories/in-memory-events-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { FakeUploader } from 'test/storage/fake-storage'

import {
  EventStatus,
  EventType,
  EventVisible,
} from '@/domain/admsjp/enums/event'

import { EditEventUseCase } from './edit-event'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryEventsRepository: InMemoryEventsRepository
let inMemoryEventLotsRepository: InMemoryEventLotsRepository
let inMemoryEventTicketsRepository: InMemoryEventTicketsRepository
let inMemoryEventPurchasesRepository: InMemoryEventPurchasesRepository
let fakeUploader: FakeUploader
let fakeMailNotifier: FakeMailNotifier

let sut: EditEventUseCase

describe('Edit Event', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryEventsRepository = new InMemoryEventsRepository()
    inMemoryEventLotsRepository = new InMemoryEventLotsRepository()
    inMemoryEventTicketsRepository = new InMemoryEventTicketsRepository(
      inMemoryEventLotsRepository,
    )
    inMemoryEventPurchasesRepository = new InMemoryEventPurchasesRepository(
      inMemoryUsersRepository,
      inMemoryEventsRepository,
      inMemoryEventLotsRepository,
      inMemoryEventTicketsRepository,
    )

    fakeUploader = new FakeUploader()
    fakeMailNotifier = new FakeMailNotifier()

    sut = new EditEventUseCase(
      inMemoryEventsRepository,
      inMemoryEventPurchasesRepository,
      fakeUploader,
      fakeMailNotifier,
    )
  })

  it('should be able to edit an existent event', async () => {
    const userFactory = makeUser()
    const user = await inMemoryUsersRepository.create(userFactory)

    const eventFactory = makeEvent()
    const event = await inMemoryEventsRepository.create(eventFactory)

    const result = await sut.execute({
      id: event.id,
      title: 'UMADSJP',
      description: 'UMADSJP Event',
      initialDate: new Date(),
      finalDate: new Date(),
      eventType: EventType.PRESENCIAL,
      fileName: 'new-attachment.png',
      fileType: 'image/png',
      body: Buffer.from(''),
      status: EventStatus.ACTIVE,
      visible: EventVisible.VISIBLE,
      updatedBy: user.id,
    })

    expect(result.isSuccess()).toBe(true)

    expect(inMemoryEventsRepository.items).toHaveLength(1)
    expect(inMemoryEventsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'UMADSJP',
          description: 'UMADSJP Event',
        }),
      ]),
    )

    expect(fakeUploader.uploads).toHaveLength(1)
    expect(fakeUploader.uploads[0]).toEqual(
      expect.objectContaining({
        fileName: 'new-attachment.png',
      }),
    )
  })
})
