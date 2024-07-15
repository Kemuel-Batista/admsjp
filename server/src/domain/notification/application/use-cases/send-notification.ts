import { Injectable } from '@nestjs/common'
import { Notification } from '@prisma/client'

import { Either, success } from '@/core/either'

import { NotificationsRepository } from '../repositories/notification-repository'

export interface SendNotificationUseCaseRequest {
  recipientId: string
  title: string
  content: string
}

export type SendNotificationUseCaseResponse = Either<
  null,
  {
    notification: Notification
  }
>

@Injectable()
export class SendNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    content,
    title,
  }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    const notification = await this.notificationsRepository.create({
      recipientId,
      title,
      content,
    })

    return success({
      notification,
    })
  }
}
