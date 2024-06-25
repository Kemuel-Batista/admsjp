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
exports.CancelEventPurchaseByExpiredTimeUseCase = void 0;
const common_1 = require("@nestjs/common");
const either_1 = require("../../../../core/either");
const limit_time_not_expired_error_1 = require("../../../../core/errors/errors/limit-time-not-expired-error");
const resource_not_found_error_1 = require("../../../../core/errors/errors/resource-not-found-error");
const event_purchases_repository_1 = require("../../repositories/event-purchases-repository");
const event_tickets_repository_1 = require("../../repositories/event-tickets-repository");
let CancelEventPurchaseByExpiredTimeUseCase = class CancelEventPurchaseByExpiredTimeUseCase {
    eventPurchasesRepository;
    eventTicketsRepository;
    constructor(eventPurchasesRepository, eventTicketsRepository) {
        this.eventPurchasesRepository = eventPurchasesRepository;
        this.eventTicketsRepository = eventTicketsRepository;
    }
    async execute({ purchaseId, }) {
        const eventPurchase = await this.eventPurchasesRepository.findById(purchaseId);
        if (!eventPurchase) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError({
                errorKey: 'eventPurchase.find.notFound',
                key: purchaseId,
            }));
        }
        const now = new Date();
        if (eventPurchase.expiresAt.getTime() > now.getTime()) {
            return (0, either_1.failure)(new limit_time_not_expired_error_1.LimitTimeNotExpiredError({
                errorKey: 'eventPurchase.delete.timeNotExpired',
            }));
        }
        const eventTickets = await this.eventTicketsRepository.listByEventPurchaseId(purchaseId);
        for (const eventTicket of eventTickets) {
            await this.eventTicketsRepository.delete(eventTicket.id);
        }
        await this.eventPurchasesRepository.delete(purchaseId);
        return (0, either_1.success)(null);
    }
};
exports.CancelEventPurchaseByExpiredTimeUseCase = CancelEventPurchaseByExpiredTimeUseCase;
exports.CancelEventPurchaseByExpiredTimeUseCase = CancelEventPurchaseByExpiredTimeUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_purchases_repository_1.EventPurchasesRepository,
        event_tickets_repository_1.EventTicketsRepository])
], CancelEventPurchaseByExpiredTimeUseCase);
//# sourceMappingURL=cancel-event-purchase-by-expired-time.js.map