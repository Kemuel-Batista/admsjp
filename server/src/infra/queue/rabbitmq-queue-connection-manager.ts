import { Injectable } from '@nestjs/common'
import { Channel, connect, Connection } from 'amqplib'

import { QueueConnectionManager } from '@/domain/admsjp/queue/queue-connection-manager'

@Injectable()
export class RabbitMQQueueConnectionManager implements QueueConnectionManager {
  private connection: Connection | null = null
  private channel: Channel | null = null
  private url: string = process.env.RABBITMQ_URL

  async connect(): Promise<void> {
    if (!this.connection) {
      this.connection = await connect(this.url)
      this.channel = await this.connection.createChannel()
    }
  }

  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.close()
      this.connection = null
      this.channel = null
    }
  }

  async createChannel(): Promise<Channel | undefined> {
    if (!this.channel) {
      console.error('Channel not established')
      return
    }
    return this.channel
  }
}
