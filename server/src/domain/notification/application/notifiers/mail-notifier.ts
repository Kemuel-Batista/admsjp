export interface MailNotifierProps {
  email: string
  title: string
  content: string
  renderedHtml: string
  attachments?: {
    path?: string
    filename: string
    cid?: string
    content?: string | Buffer
    encoding?: string
  }[]
}

export abstract class MailNotifier {
  abstract send(params: MailNotifierProps): Promise<void>
}
