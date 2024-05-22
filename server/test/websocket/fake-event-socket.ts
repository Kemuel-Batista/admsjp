import {
  EventSocket,
  EventSocketEmmiter,
} from '@/domain/admsjp/websocket/event-socket'

export class FakeEventSocket implements EventSocket {
  async emit(data: EventSocketEmmiter): Promise<void> {
    console.log(
      `Send socket io to ${data.to} - event ${data.event} with data: ${data.data}`,
    )
  }
}
