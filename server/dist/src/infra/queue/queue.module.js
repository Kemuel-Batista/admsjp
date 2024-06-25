"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueModule = void 0;
const common_1 = require("@nestjs/common");
const event_queue_1 = require("../../domain/admsjp/queue/event-queue");
const create_event_purchase_1 = require("../../domain/admsjp/use-cases/event-purchase/create-event-purchase");
const database_module_1 = require("../database/database.module");
const generators_module_1 = require("../generators/generators.module");
const websocket_module_1 = require("../websocket/websocket.module");
const event_queue_consumer_1 = require("./event-queue-consumer");
const event_queue_rabbitmq_1 = require("./event-queue-rabbitmq");
let QueueModule = class QueueModule {
    eventQueueConsumer;
    constructor(eventQueueConsumer) {
        this.eventQueueConsumer = eventQueueConsumer;
    }
    async onModuleInit() {
        this.eventQueueConsumer.execute();
    }
};
exports.QueueModule = QueueModule;
exports.QueueModule = QueueModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, generators_module_1.GeneratorsModule, websocket_module_1.WebsocketModule],
        providers: [
            { provide: event_queue_1.EventQueue, useClass: event_queue_rabbitmq_1.EventQueueRabbitMQ },
            create_event_purchase_1.CreateEventPurchaseUseCase,
            event_queue_consumer_1.EventQueueConsumer,
        ],
        exports: [event_queue_1.EventQueue],
    }),
    __metadata("design:paramtypes", [event_queue_consumer_1.EventQueueConsumer])
], QueueModule);
//# sourceMappingURL=queue.module.js.map