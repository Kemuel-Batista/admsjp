import { Injectable } from '@nestjs/common'

import { EventQueue, EventQueueProps } from '../../queue/event-queue'

@Injectable()
export class RegisterEventQueue {
  constructor(private eventQueue: EventQueue) {}

  async execute(data: EventQueueProps): Promise<void> {
    await this.eventQueue.enqueue(data)
  }
}
