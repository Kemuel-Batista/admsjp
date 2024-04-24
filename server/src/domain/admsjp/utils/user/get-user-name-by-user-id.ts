import { FindUserByIdUseCase } from '@/domain/admsjp/use-cases/user/find/by-id/find-user-by-id'

import { UsersRepository } from '../../repositories/users-repository'

interface User {
  id: number
  name: string
}

interface IRecord {
  createdBy: User['id']
  updatedBy: User['id']
}

export async function getUserNameByUserId<T extends IRecord>(
  records: T[],
  userRepository: UsersRepository,
): Promise<T[]> {
  const findUserByIdUseCase = new FindUserByIdUseCase(userRepository)

  const usersToFetch: Array<User['id']> = []
  const userIdsMap: Record<number, string | null> = {}

  for (const record of records) {
    if (!userIdsMap[record.createdBy]) {
      userIdsMap[record.createdBy] = null
      usersToFetch.push(record.createdBy)
    }

    if (!userIdsMap[record.updatedBy]) {
      userIdsMap[record.updatedBy] = null
      usersToFetch.push(record.updatedBy)
    }
  }

  for (const userId of usersToFetch) {
    const user = await findUserByIdUseCase.execute(userId)

    if (user !== null) {
      userIdsMap[user.id] = user.name
    }
  }

  const recordsWithUsers: T[] = records.map((record) => ({
    ...record,
    createdBy: userIdsMap[record.createdBy],
    updatedBy: userIdsMap[record.updatedBy],
  }))

  return recordsWithUsers
}
