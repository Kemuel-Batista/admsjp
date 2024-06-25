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
exports.CreateEventPurchaseUseCase = void 0;
const common_1 = require("@nestjs/common");
const either_1 = require("../../../../core/either");
const resource_not_found_error_1 = require("../../../../core/errors/errors/resource-not-found-error");
const tickets_sold_out_error_1 = require("../../../../core/errors/errors/tickets-sold-out-error");
const event_purchase_1 = require("../../enums/event-purchase");
const ticket_generator_1 = require("../../generators/ticket-generator");
const event_lots_repository_1 = require("../../repositories/event-lots-repository");
const event_purchases_repository_1 = require("../../repositories/event-purchases-repository");
const event_tickets_repository_1 = require("../../repositories/event-tickets-repository");
const events_repository_1 = require("../../repositories/events-repository");
const users_repository_1 = require("../../repositories/users-repository");
let CreateEventPurchaseUseCase = class CreateEventPurchaseUseCase {
    eventPurchasesRepository;
    eventsRepository;
    eventLotsRepository;
    eventTicketsRepository;
    usersRepository;
    ticketGenerator;
    constructor(eventPurchasesRepository, eventsRepository, eventLotsRepository, eventTicketsRepository, usersRepository, ticketGenerator) {
        this.eventPurchasesRepository = eventPurchasesRepository;
        this.eventsRepository = eventsRepository;
        this.eventLotsRepository = eventLotsRepository;
        this.eventTicketsRepository = eventTicketsRepository;
        this.usersRepository = usersRepository;
        this.ticketGenerator = ticketGenerator;
    }
    async execute({ eventId, buyerId, eventLotInfo, }) {
        const event = await this.eventsRepository.findById(eventId);
        if (!event) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError({
                errorKey: 'event.find.notFound',
                key: String(eventId),
            }));
        }
        const buyer = await this.usersRepository.findById(buyerId);
        if (!buyer) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError({
                errorKey: 'user.find.notFound',
                key: String(buyerId),
            }));
        }
        const eventLotsPromise = eventLotInfo.map(async (item) => {
            const eventLot = await this.eventLotsRepository.findById(item.eventLotId);
            if (!eventLot) {
                return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError({
                    errorKey: 'eventLot.find.notFound',
                    key: String(item.eventLotId),
                }));
            }
            if (eventLot.quantity === eventLot.fulfilledQuantity) {
                return (0, either_1.failure)(new tickets_sold_out_error_1.TicketsSoldOutError({
                    errorKey: 'eventLot.sales.sold-out',
                    key: eventLot.lot.toString(),
                }));
            }
            const remainingQuantity = eventLot.quantity - eventLot.fulfilledQuantity;
            if (item.quantity > remainingQuantity) {
                return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError({
                    errorKey: 'eventLot.sales.remaining-qty-not-enough',
                    key: String(item.eventLotId),
                }));
            }
            eventLot.fulfilledQuantity += item.quantity;
            await this.eventLotsRepository.save(eventLot);
            return eventLot;
        });
        await Promise.all(eventLotsPromise);
        const lastInvoiceNumber = await this.eventPurchasesRepository.lastInvoiceNumber();
        const invoiceNumber = await this.ticketGenerator.generate('EV', lastInvoiceNumber);
        const now = new Date();
        const expiresAt = new Date(now.getTime() + 15 * 60 * 1000);
        const eventPurchase = await this.eventPurchasesRepository.create({
            eventId,
            buyerId,
            invoiceNumber,
            expiresAt,
            status: event_purchase_1.EventPurchaseStatus.NEW,
        });
        const eventTicketsPromise = eventLotInfo.flatMap((item, lotIndex) => {
            return Array.from({ length: item.quantity }, (_, ticketIndex) => {
                const index = lotIndex * 1000 + ticketIndex;
                return this.eventTicketsRepository.create({
                    eventPurchaseId: eventPurchase.id,
                    eventLotId: item.eventLotId,
                    ticket: `${eventPurchase.invoiceNumber}-${index}`,
                    qrCodeImage: '',
                    qrCodeText: '',
                });
            });
        });
        await Promise.all(eventTicketsPromise);
    }
};
exports.CreateEventPurchaseUseCase = CreateEventPurchaseUseCase;
exports.CreateEventPurchaseUseCase = CreateEventPurchaseUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_purchases_repository_1.EventPurchasesRepository,
        events_repository_1.EventsRepository,
        event_lots_repository_1.EventLotsRepository,
        event_tickets_repository_1.EventTicketsRepository,
        users_repository_1.UsersRepository,
        ticket_generator_1.TicketGenerator])
], CreateEventPurchaseUseCase);
//# sourceMappingURL=create-event-purchase.js.map