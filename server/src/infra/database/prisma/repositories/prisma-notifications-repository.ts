import { Injectable } from '@nestjs/common'

import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const data = PrismaNotificationMapper.toPersistency(notification)

    await this.prisma.notification.create({
      data,
    })
  }
}
