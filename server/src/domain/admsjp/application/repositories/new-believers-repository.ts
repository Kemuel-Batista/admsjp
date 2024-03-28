import { NewBeliever } from '../../enterprise/entities/new-believer'

export abstract class NewBelieversRepository {
  abstract findById(id: string): Promise<NewBeliever | null>
  abstract findByPhone(phone: string): Promise<NewBeliever | null>
  abstract findByEmail(email: string): Promise<NewBeliever | null>
  abstract create(newBeliever: NewBeliever): Promise<void>
}
