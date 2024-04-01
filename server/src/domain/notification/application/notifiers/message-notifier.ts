export interface MessageNotifierProps {
  phone: string
  title: string
  content: string
}

export abstract class MessageNotifier {
  abstract send(params: MessageNotifierProps): Promise<void>
}
