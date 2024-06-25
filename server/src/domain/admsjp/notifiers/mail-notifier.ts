export interface MailNotifierProps {
  email: string
  title: string
  content: string
  renderedHtml: string
}

export abstract class MailNotifier {
  abstract send(params: MailNotifierProps): Promise<void>
}
