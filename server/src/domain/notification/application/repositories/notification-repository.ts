import { Notification, Prisma } from '@prisma/client'

export abstract class NotificationsRepository {
  abstract create(
    data: Prisma.NotificationUncheckedCreateInput,
  ): Promise<Notification>
}
