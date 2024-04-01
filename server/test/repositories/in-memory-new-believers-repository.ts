import { DomainEvents } from '@/core/events/domain-events'
import { NewBelieversRepository } from '@/domain/admsjp/application/repositories/new-believers-repository'
import { NewBeliever } from '@/domain/admsjp/enterprise/entities/new-believer'

export class InMemoryNewBelieversRepository implements NewBelieversRepository {
  public items: NewBeliever[] = []

  async findById(id: string): Promise<NewBeliever> {
    const newBeliever = this.items.find((item) => item.id.toString() === id)

    if (!newBeliever) {
      return null
    }

    return newBeliever
  }

  async findByPhone(phone: string): Promise<NewBeliever> {
    const newBeliever = this.items.find((item) => item.phone === phone)

    if (!newBeliever) {
      return null
    }

    return newBeliever
  }

  async findByEmail(email: string): Promise<NewBeliever> {
    const newBeliever = this.items.find((item) => item.email === email)

    if (!newBeliever) {
      return null
    }

    return newBeliever
  }

  async create(newBeliever: NewBeliever) {
    this.items.push(newBeliever)

    DomainEvents.dispatchEventsForAggregate(newBeliever.id)
  }
}
