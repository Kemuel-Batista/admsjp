import * as amqp from 'amqplib'

import { EventQueue, EventQueueProps } from '@/domain/admsjp/queue/event-queue'

export class EventQueueRabbitMQ implements EventQueue {
  private readonly queueName = 'event_queue'
  private connection: amqp.Connection
  private channel: amqp.Channel

  constructor() {
    this.initialize()
  }

  private async initialize() {
    try {
      this.connection = await amqp.connect({
        protocol: 'amqp',
        hostname: 'localhost',
        port: 5672,
        username: 'rabbitmq',
        password: 'rabbitmq',
      })
      this.channel = await this.connection.createChannel()
      await this.channel.assertQueue(this.queueName, { durable: true })
    } catch (error) {
      console.error('Failed to connect to RabbitMQ', error)
    }
  }

  async enqueue(event: EventQueueProps[]): Promise<void> {
    if (!this.channel) {
      throw new Error('Channel is not initialized')
    }

    const buffer = Buffer.from(JSON.stringify(event))
    this.channel.sendToQueue(this.queueName, buffer, { persistent: true })
  }
}
