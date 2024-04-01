import { makeChurch } from 'test/factories/make-church'
import { InMemoryChurchsRepository } from 'test/repositories/in-memory-churchs-repository'
import { InMemoryNewBelieversRepository } from 'test/repositories/in-memory-new-believers-repository'

import { CreateNewBelieverUseCase } from './create-new-believer'

let inMemoryNewBelieversRepository: InMemoryNewBelieversRepository
let inMemoryChurchsRepository: InMemoryChurchsRepository

let sut: CreateNewBelieverUseCase

describe('Create New Beliver', () => {
  beforeEach(() => {
    inMemoryNewBelieversRepository = new InMemoryNewBelieversRepository()
    inMemoryChurchsRepository = new InMemoryChurchsRepository()

    sut = new CreateNewBelieverUseCase(
      inMemoryNewBelieversRepository,
      inMemoryChurchsRepository,
    )
  })

  it('should be able to create a new believer', async () => {
    const church = makeChurch()
    const churchId = church.id.toString()
    inMemoryChurchsRepository.items.push(church)

    const result = await sut.execute({
      churchId,
      name: 'Kemuel',
      lastName: 'Batista',
      phone: '+5581989943240',
      email: 'kemuellima20@gmail.com',
      birthday: new Date(),
      street: 'Rua Joinville',
      neighborhood: 'Pedro Moro',
      city: 'SJP',
      state: 'PR',
      postalCode: '45678978',
      number: '755',
      lgpd: true,
    })

    expect(result.isSuccess()).toBe(true)
    expect(inMemoryNewBelieversRepository.items).toHaveLength(1)
  })
})
