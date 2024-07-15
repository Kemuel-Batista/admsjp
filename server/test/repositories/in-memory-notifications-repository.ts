import { randomUUID } from 'node:crypto'

import { Notification, Prisma } from '@prisma/client'

import { NotificationsRepository } from '@/domain/notification/application/repositories/notification-repository'

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public items: Notification[] = []

  async create(data: Prisma.NotificationUncheckedCreateInput) {
    const notification = {
      id: randomUUID(),
      recipientId: data.recipientId,
      title: data.title,
      content: data.content,
      readAt: null,
      createdAt: new Date(),
    }

    this.items.push(notification)

    return notification
  }
}
