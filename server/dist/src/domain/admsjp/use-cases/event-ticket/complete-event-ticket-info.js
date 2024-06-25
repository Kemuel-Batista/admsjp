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
exports.CompleteEventTicketInfoUseCase = void 0;
const common_1 = require("@nestjs/common");
const either_1 = require("../../../../core/either");
const incorrect_association_error_1 = require("../../../../core/errors/errors/incorrect-association-error");
const resource_not_found_error_1 = require("../../../../core/errors/errors/resource-not-found-error");
const event_purchases_repository_1 = require("../../repositories/event-purchases-repository");
const event_tickets_repository_1 = require("../../repositories/event-tickets-repository");
let CompleteEventTicketInfoUseCase = class CompleteEventTicketInfoUseCase {
    eventTicketsRepository;
    eventPurchasesRepository;
    constructor(eventTicketsRepository, eventPurchasesRepository) {
        this.eventTicketsRepository = eventTicketsRepository;
        this.eventPurchasesRepository = eventPurchasesRepository;
    }
    async execute({ id, eventPurchaseId, name, email, cpf, phone, birthday, requestedBy, }) {
        const eventTicket = await this.eventTicketsRepository.findById(id);
        if (!eventTicket) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError({
                errorKey: 'eventTicket.find.notFound',
                key: id.toString(),
            }));
        }
        const eventPurchase = await this.eventPurchasesRepository.findById(eventPurchaseId);
        if (!eventPurchase) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError({
                errorKey: 'eventPurchase.find.notFound',
                key: id.toString(),
            }));
        }
        if (eventPurchase.buyerId !== requestedBy) {
            return (0, either_1.failure)(new incorrect_association_error_1.IncorrectAssociationError({
                errorKey: 'eventPurchase.find.incorrectAssociation',
            }));
        }
        if (eventTicket.eventPurchaseId !== eventPurchaseId) {
            return (0, either_1.failure)(new incorrect_association_error_1.IncorrectAssociationError({
                errorKey: 'eventTicket.find.incorrectAssociation',
            }));
        }
        eventTicket.name = name;
        eventTicket.email = email;
        eventTicket.cpf = cpf;
        eventTicket.phone = phone;
        eventTicket.birthday = birthday;
        await this.eventTicketsRepository.save(eventTicket);
        return (0, either_1.success)(null);
    }
};
exports.CompleteEventTicketInfoUseCase = CompleteEventTicketInfoUseCase;
exports.CompleteEventTicketInfoUseCase = CompleteEventTicketInfoUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_tickets_repository_1.EventTicketsRepository,
        event_purchases_repository_1.EventPurchasesRepository])
], CompleteEventTicketInfoUseCase);
//# sourceMappingURL=complete-event-ticket-info.js.map