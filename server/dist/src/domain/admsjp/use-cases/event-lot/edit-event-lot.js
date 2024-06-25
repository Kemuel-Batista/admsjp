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
exports.EditEventLotUseCase = void 0;
const common_1 = require("@nestjs/common");
const either_1 = require("../../../../core/either");
const resource_not_found_error_1 = require("../../../../core/errors/errors/resource-not-found-error");
const event_lots_repository_1 = require("../../repositories/event-lots-repository");
const event_tickets_repository_1 = require("../../repositories/event-tickets-repository");
let EditEventLotUseCase = class EditEventLotUseCase {
    eventLotsRepository;
    eventTicketsRepository;
    constructor(eventLotsRepository, eventTicketsRepository) {
        this.eventLotsRepository = eventLotsRepository;
        this.eventTicketsRepository = eventTicketsRepository;
    }
    async execute({ id, lot, quantity, value, status, }) {
        const eventLot = await this.eventLotsRepository.findById(id);
        if (!eventLot) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError({
                errorKey: 'eventLot.find.notFound',
                key: lot.toString(),
            }));
        }
        const doesEventLotHasAssociations = await this.eventTicketsRepository.listByEventLotId(id);
        if (doesEventLotHasAssociations.length === 0) {
            eventLot.value = value;
            eventLot.status = status;
        }
        eventLot.quantity = quantity;
        await this.eventLotsRepository.save(eventLot);
        return (0, either_1.success)(null);
    }
};
exports.EditEventLotUseCase = EditEventLotUseCase;
exports.EditEventLotUseCase = EditEventLotUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_lots_repository_1.EventLotsRepository,
        event_tickets_repository_1.EventTicketsRepository])
], EditEventLotUseCase);
//# sourceMappingURL=edit-event-lot.js.map