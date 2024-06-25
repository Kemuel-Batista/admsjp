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
exports.DeleteEventUseCase = void 0;
const common_1 = require("@nestjs/common");
const either_1 = require("../../../../core/either");
const resource_has_associations_error_1 = require("../../../../core/errors/errors/resource-has-associations-error");
const resource_not_found_error_1 = require("../../../../core/errors/errors/resource-not-found-error");
const event_lots_repository_1 = require("../../repositories/event-lots-repository");
const event_tickets_repository_1 = require("../../repositories/event-tickets-repository");
const events_repository_1 = require("../../repositories/events-repository");
let DeleteEventUseCase = class DeleteEventUseCase {
    eventsRepository;
    eventLotsRepository;
    eventTicketsRepository;
    constructor(eventsRepository, eventLotsRepository, eventTicketsRepository) {
        this.eventsRepository = eventsRepository;
        this.eventLotsRepository = eventLotsRepository;
        this.eventTicketsRepository = eventTicketsRepository;
    }
    async execute({ id, }) {
        const event = await this.eventsRepository.findById(id);
        if (!event) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError({
                errorKey: 'event.find.notFound',
                key: String(id),
            }));
        }
        const { eventLots } = await this.eventLotsRepository.listByEventId(event.id, {}, []);
        for (const eventLot of eventLots) {
            const eventTickets = await this.eventTicketsRepository.listByEventLotId(eventLot.id);
            if (eventTickets.length > 0) {
                return (0, either_1.failure)(new resource_has_associations_error_1.ResourceHasAssociationsError({
                    errorKey: 'event.delete.hasAssociations',
                }));
            }
        }
        await this.eventsRepository.delete(id);
        return (0, either_1.success)(null);
    }
};
exports.DeleteEventUseCase = DeleteEventUseCase;
exports.DeleteEventUseCase = DeleteEventUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [events_repository_1.EventsRepository,
        event_lots_repository_1.EventLotsRepository,
        event_tickets_repository_1.EventTicketsRepository])
], DeleteEventUseCase);
//# sourceMappingURL=delete-event.js.map