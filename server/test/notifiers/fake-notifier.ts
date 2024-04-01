import {
  Notifier,
  NotifierProps,
} from '@/domain/notification/application/notifiers/notifier'

export class FakeNotifier implements Notifier {
  send({ name, email, title, content }: NotifierProps): Promise<void> {
    console.log(
      `Simulating notification sent to ${name} (${email}): ${title} - ${content}`,
    )
    return Promise.resolve()
  }
}
