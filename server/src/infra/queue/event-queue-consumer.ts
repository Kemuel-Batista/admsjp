import { Injectable, OnModuleInit } from '@nestjs/common'
import * as amqp from 'amqplib'

import { CreateEventTicketUseCase } from '@/domain/admsjp/use-cases/event-ticket/create-event-ticket'
import { EventSocket } from '@/domain/admsjp/websocket/event-socket'

@Injectable()
export class EventQueueConsumer implements OnModuleInit {
  private readonly queueName = 'event_queue'
  private connection: amqp.Connection
  private channel: amqp.Channel

  constructor(
    private createEventTicket: CreateEventTicketUseCase,
    private eventSocket: EventSocket,
  ) {}

  async onModuleInit() {
    await this.initialize()
    await this.execute()
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

  async execute() {
    this.channel.consume(
      this.queueName,
      async (msg) => {
        if (msg !== null) {
          const event = JSON.parse(msg.content.toString())

          await this.eventSocket.emit({
            to: `purchase:${event.userId}`,
            event: 'order-processing-started',
          })

          await this.createEventTicket.execute(event)

          this.channel.ack(msg)
        }
      },
      { noAck: false },
    )
  }
}
