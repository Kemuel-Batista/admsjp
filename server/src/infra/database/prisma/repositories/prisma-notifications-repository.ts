import { Injectable } from '@nestjs/common'
import { Notification, Prisma } from '@prisma/client'

import { NotificationsRepository } from '@/domain/notification/application/repositories/notification-repository'

import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) {}

  async create({
    recipientId,
    title,
    content,
  }: Prisma.NotificationUncheckedCreateInput): Promise<Notification> {
    const notification = await this.prisma.notification.create({
      data: {
        recipientId,
        title,
        content,
      },
    })

    return notification
  }
}
