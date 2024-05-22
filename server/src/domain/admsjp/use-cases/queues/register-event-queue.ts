import { Injectable } from '@nestjs/common'

import { EventQueue, EventQueueProps } from '../../queue/event-queue'
import { EventSocket } from '../../websocket/event-socket'

@Injectable()
export class RegisterEventQueue {
  constructor(
    private eventQueue: EventQueue,
    private eventSocket: EventSocket,
  ) {}

  async execute(data: EventQueueProps): Promise<void> {
    await this.eventQueue.enqueue(data)

    await this.eventSocket.emit({
      to: `purchase:${data.userId}`,
      event: 'order-queued',
    })
  }
}
