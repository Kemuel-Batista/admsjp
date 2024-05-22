export interface EventSocketEmmiter {
  to: string
  event: string
  data?: unknown
}

export abstract class EventSocket {
  abstract emit(data: EventSocketEmmiter): Promise<void>
}
