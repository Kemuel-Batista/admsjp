import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DomainEvent } from '@/core/events/domain-event'

import { NewBeliever } from '../entities/new-believer'

export class NewBelieverCreatedEvent implements DomainEvent {
  public ocurredAt: Date
  public newBeliever: NewBeliever

  constructor(newBeliever: NewBeliever) {
    this.newBeliever = newBeliever
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.newBeliever.id
  }
}
