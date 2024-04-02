import { makeChurch } from 'test/factories/make-church'
import { makeNewBeliever } from 'test/factories/make-new-believer'
import { FakeNotifier } from 'test/notifiers/fake-notifier'
import { InMemoryChurchsRepository } from 'test/repositories/in-memory-churchs-repository'
import { InMemoryNewBelieversRepository } from 'test/repositories/in-memory-new-believers-repository'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { waitFor } from 'test/utils/wait-for'
import { MockInstance } from 'vitest'

import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from '../use-cases/send-notification'
import { OnNewBelieverCreated } from './on-new-believer-created'

let inMemoryNewBelieversRepository: InMemoryNewBelieversRepository
let inMemoryChurchsRepository: InMemoryChurchsRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sendNotificationUseCase: SendNotificationUseCase
let fakeNotifier: FakeNotifier

let sendNotificationExecuteSpy: MockInstance<
  [SendNotificationUseCaseRequest],
  Promise<SendNotificationUseCaseResponse>
>

describe('On NewBeliever Created', () => {
  beforeAll(() => {
    fakeNotifier = new FakeNotifier()
    inMemoryNewBelieversRepository = new InMemoryNewBelieversRepository()
    inMemoryChurchsRepository = new InMemoryChurchsRepository()
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()

    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    )

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnNewBelieverCreated(
      inMemoryNewBelieversRepository,
      sendNotificationUseCase,
      fakeNotifier,
    )
  })

  it('should send a notification to the newBeliever when the new-believer is created', async () => {
    const church = makeChurch()
    inMemoryChurchsRepository.items.push(church)

    const newBeliever = makeNewBeliever({
      churchId: church.id,
    })
    inMemoryNewBelieversRepository.create(newBeliever)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
