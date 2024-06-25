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
exports.CreateEventAddressUseCase = void 0;
const common_1 = require("@nestjs/common");
const either_1 = require("../../../../core/either");
const resource_not_found_error_1 = require("../../../../core/errors/errors/resource-not-found-error");
const event_addresses_repository_1 = require("../../repositories/event-addresses-repository");
const events_repository_1 = require("../../repositories/events-repository");
let CreateEventAddressUseCase = class CreateEventAddressUseCase {
    eventAddressesRepository;
    eventsRepository;
    constructor(eventAddressesRepository, eventsRepository) {
        this.eventAddressesRepository = eventAddressesRepository;
        this.eventsRepository = eventsRepository;
    }
    async execute({ eventId, street, complement, neighborhood, number, city, state, latitude, longitude, createdBy, }) {
        const event = await this.eventsRepository.findById(eventId);
        if (!event) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError({
                errorKey: 'event.find.notFound',
                key: String(eventId),
            }));
        }
        const eventAddress = await this.eventAddressesRepository.create({
            eventId,
            street,
            complement,
            neighborhood,
            number,
            city,
            state,
            latitude,
            longitude,
            createdBy,
        });
        return (0, either_1.success)({
            eventAddress,
        });
    }
};
exports.CreateEventAddressUseCase = CreateEventAddressUseCase;
exports.CreateEventAddressUseCase = CreateEventAddressUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_addresses_repository_1.EventAddressesRepository,
        events_repository_1.EventsRepository])
], CreateEventAddressUseCase);
//# sourceMappingURL=create-event-address.js.map