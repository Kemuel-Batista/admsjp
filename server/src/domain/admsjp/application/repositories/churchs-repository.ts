import { Church } from '../../enterprise/entities/church'

export abstract class ChurchsRepository {
  abstract findById(id: string): Promise<Church | null>
  abstract findByName(name: string, id?: string): Promise<Church | null>
  abstract findByUsername(username: string): Promise<Church | null>
  abstract create(church: Church): Promise<void>
  abstract save(church: Church): Promise<void>
  abstract delete(church: Church): Promise<void>
}
