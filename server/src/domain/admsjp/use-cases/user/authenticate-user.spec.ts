import { FakeEncrypter } from 'test/cryptography/fake-encrypter'
import { FakeHasher } from 'test/cryptography/fake-hasher'
import { makeUser } from 'test/factories/make-user'
import { InMemoryProfilesRepository } from 'test/repositories/in-memory-profiles-repository'
import { InMemoryUsersOnProfilesRepository } from 'test/repositories/in-memory-users-on-profiles-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { AuthenticateUserUseCase } from './authenticate-user'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryProfilesRepository: InMemoryProfilesRepository
let inMemoryUsersOnProfilesRepository: InMemoryUsersOnProfilesRepository
let fakeHasher: FakeHasher
let encrypter: FakeEncrypter

let sut: AuthenticateUserUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryProfilesRepository = new InMemoryProfilesRepository()
    inMemoryUsersOnProfilesRepository = new InMemoryUsersOnProfilesRepository(
      inMemoryProfilesRepository,
    )

    fakeHasher = new FakeHasher()
    encrypter = new FakeEncrypter()

    sut = new AuthenticateUserUseCase(
      inMemoryUsersRepository,
      inMemoryUsersOnProfilesRepository,
      fakeHasher,
      encrypter,
    )
  })

  it('should be able to authenticate a user', async () => {
    const userFactory = makeUser({
      email: '123456',
      password: await fakeHasher.hash('123456'),
    })
    const user = await inMemoryUsersRepository.create(userFactory)

    const result = await sut.execute({
      email: user.email,
      password: '123456',
    })

    expect(result.isSuccess()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })
})
