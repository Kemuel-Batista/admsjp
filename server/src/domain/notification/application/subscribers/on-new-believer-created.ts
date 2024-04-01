import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { Injectable } from '@nestjs/common'
import handlebars from 'handlebars'

import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { ChurchsRepository } from '@/domain/admsjp/application/repositories/churchs-repository'
import { NewBelieversRepository } from '@/domain/admsjp/application/repositories/new-believers-repository'
import { NewBelieverCreatedEvent } from '@/domain/admsjp/enterprise/events/new-believer-created'

import { MailNotifier } from '../notifiers/mail-notifier'
import { SendNotificationUseCase } from '../use-cases/send-notification'

@Injectable()
export class OnNewBelieverCreated implements EventHandler {
  constructor(
    private newBelieversRepository: NewBelieversRepository,
    private churchsRepository: ChurchsRepository,
    private sendNotification: SendNotificationUseCase,
    private mailNotifier: MailNotifier,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewBelieverNotification.bind(this),
      NewBelieverCreatedEvent.name,
    )
  }

  private async sendNewBelieverNotification({
    newBeliever: NewBelieverCreated,
  }: NewBelieverCreatedEvent) {
    const newBeliever = await this.newBelieversRepository.findById(
      NewBelieverCreated.id.toString(),
    )

    // Se existi e se concordou em aceitar notificações
    if (newBeliever && newBeliever.lgpd) {
      await this.sendNotification.execute({
        recipientId: newBeliever.id.toString(),
        title: 'Bem-vindo a ADMSJP',
        content: 'Seja muito bem-vindo a ADMSJP',
      })

      const htmlPath = join(
        __dirname,
        '..',
        'views',
        'new-believer-created.hbs',
      )
      const templateHtml = readFileSync(htmlPath, 'utf-8')

      const compiledTemplate = handlebars.compile(templateHtml)
      const renderedHtml = compiledTemplate({
        name: newBeliever.name,
        lastName: newBeliever.lastName,
      })

      await this.mailNotifier.send({
        email: newBeliever.email,
        title: 'Bem-vindo a ADMSJP',
        content: 'Seja muito bem-vindo a ADMSJP',
        renderedHtml,
      })
    }
  }
}
