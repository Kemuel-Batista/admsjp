import { makeUser } from 'test/factories/make-user'
import { InMemoryEventAddressesRepository } from 'test/repositories/in-memory-event-addresses-repository'
import { InMemoryEventLotsRepository } from 'test/repositories/in-memory-event-lots-repository'
import { InMemoryEventsRepository } from 'test/repositories/in-memory-events-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { FakeUploader } from 'test/storage/fake-storage'

import {
  EventStatus,
  EventType,
  EventVisible,
} from '@/domain/admsjp/enums/event'

import { CreateEventAddressUseCase } from '../../event-address/create/create-event-address'
import { CreateEventLotUseCase } from '../../event-lot/create/create-event-lot'
import { FindMaxEventLotByEventIdUseCase } from '../../event-lot/find/max-lot-by-event-id/find-max-event-lot-by-event-id'
import { FindEventByIdUseCase } from '../find/by-id/find-event-by-id'
import { FindEventBySlugUseCase } from '../find/by-slug/find-event-by-slug'
import { FindEventByTitleUseCase } from '../find/by-title/find-event-by-title'
import { CreateEventUseCase } from './create-event'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryEventsRepository: InMemoryEventsRepository
let inMemoryEventLotsRepository: InMemoryEventLotsRepository
let inMemoryEventAddressesRepository: InMemoryEventAddressesRepository
let fakeUploader: FakeUploader

let findEventByIdUseCase: FindEventByIdUseCase
let findEventByTitleUseCase: FindEventByTitleUseCase
let findEventBySlugUseCase: FindEventBySlugUseCase
let createEventLotUseCase: CreateEventLotUseCase
let findMaxEventLotByEventIdUseCase: FindMaxEventLotByEventIdUseCase
let createEventAddressUseCase: CreateEventAddressUseCase

let sut: CreateEventUseCase

describe('Create Event', () => {
  beforeAll(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryEventsRepository = new InMemoryEventsRepository()
    inMemoryEventLotsRepository = new InMemoryEventLotsRepository()
    inMemoryEventAddressesRepository = new InMemoryEventAddressesRepository()

    fakeUploader = new FakeUploader()

    findEventByTitleUseCase = new FindEventByTitleUseCase(
      inMemoryEventsRepository,
    )

    findEventBySlugUseCase = new FindEventBySlugUseCase(
      inMemoryEventsRepository,
    )

    findMaxEventLotByEventIdUseCase = new FindMaxEventLotByEventIdUseCase(
      inMemoryEventLotsRepository,
    )

    findEventByIdUseCase = new FindEventByIdUseCase(inMemoryEventsRepository)

    createEventLotUseCase = new CreateEventLotUseCase(
      inMemoryEventLotsRepository,
      findEventByIdUseCase,
      findMaxEventLotByEventIdUseCase,
    )

    createEventAddressUseCase = new CreateEventAddressUseCase(
      inMemoryEventAddressesRepository,
      findEventByIdUseCase,
    )

    sut = new CreateEventUseCase(
      inMemoryEventsRepository,
      findEventByTitleUseCase,
      findEventBySlugUseCase,
      createEventLotUseCase,
      createEventAddressUseCase,
      fakeUploader,
    )
  })

  it('should be able to create a remote event', async () => {
    const user = makeUser()
    inMemoryUsersRepository.create({
      ...user,
      profileId: user.profileId,
    })

    await sut.execute({
      title: 'UMADSJP',
      description: 'UMADSJP Event',
      initialDate: new Date(),
      finalDate: new Date(),
      eventType: EventType.REMOTO,
      departmentId: user.departmentId,
      fileName: 'attachment.png',
      fileType: 'image/png',
      body: Buffer.from(''),
      status: EventStatus.ACTIVE,
      visible: EventVisible.VISIBLE,
      imagePath: '',
      slug: '',
      lots: [
        {
          eventId: null,
          lot: 1,
          quantity: 1,
          status: 1,
          value: 100,
          createdBy: user.id,
        },
      ],
      address: null,
      createdBy: user.id,
    })

    expect(inMemoryEventsRepository.items).toHaveLength(1)
    expect(inMemoryEventsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: 'UMADSJP',
          description: 'UMADSJP Event',
        }),
      ]),
    )

    expect(inMemoryEventLotsRepository.items).toHaveLength(1)
    expect(inMemoryEventLotsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          eventId: 1,
          lot: 1,
          value: 100,
        }),
      ]),
    )

    expect(inMemoryEventAddressesRepository.items).toHaveLength(0)

    expect(fakeUploader.uploads).toHaveLength(1)
    expect(fakeUploader.uploads[0]).toEqual(
      expect.objectContaining({
        fileName: 'attachment.png',
      }),
    )
  })
})
