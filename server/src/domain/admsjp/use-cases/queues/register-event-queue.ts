import { Injectable } from '@nestjs/common'

import { EventQueue, EventQueueProps } from '../../queue/event-queue'
import { EventSocket } from '../../websocket/event-socket'

@Injectable()
export class RegisterEventQueue {
  constructor(
    private eventQueue: EventQueue,
    private eventSocket: EventSocket,
  ) {}

  async execute(data: EventQueueProps[]): Promise<void> {
    await this.eventQueue.enqueue(data)

    const { userId } = data[0]

    await this.eventSocket.emit({
      to: `purchase:${userId}`,
      event: 'order-queued',
    })
  }
}
