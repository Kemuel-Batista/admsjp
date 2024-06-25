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
exports.EditEventAddressUseCase = void 0;
const common_1 = require("@nestjs/common");
const either_1 = require("../../../../core/either");
const incorrect_association_error_1 = require("../../../../core/errors/errors/incorrect-association-error");
const resource_not_found_error_1 = require("../../../../core/errors/errors/resource-not-found-error");
const event_1 = require("../../enums/event");
const event_addresses_repository_1 = require("../../repositories/event-addresses-repository");
const events_repository_1 = require("../../repositories/events-repository");
const invalid_event_type_error_1 = require("../../../../core/errors/errors/invalid-event-type-error");
let EditEventAddressUseCase = class EditEventAddressUseCase {
    eventAddressesRepository;
    eventsRepository;
    constructor(eventAddressesRepository, eventsRepository) {
        this.eventAddressesRepository = eventAddressesRepository;
        this.eventsRepository = eventsRepository;
    }
    async execute({ id, street, number, complement, neighborhood, state, city, latitude, longitude, updatedBy, }) {
        const eventAddress = await this.eventAddressesRepository.findById(id);
        if (!eventAddress) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError({
                errorKey: 'eventAddress.find.notFound',
                key: String(id),
            }));
        }
        const event = await this.eventsRepository.findById(eventAddress.eventId);
        if (!event) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError({
                errorKey: 'event.find.notFound',
                key: String(eventAddress.eventId),
            }));
        }
        if (eventAddress.eventId !== event.id) {
            return (0, either_1.failure)(new incorrect_association_error_1.IncorrectAssociationError({
                errorKey: 'eventAddress.find.incorrectAssociation',
            }));
        }
        if (event.eventType === event_1.EventType.REMOTO) {
            return (0, either_1.failure)(new invalid_event_type_error_1.InvalidEventTypeError({
                errorKey: 'event.find.invalidEventType',
                key: String(event.eventType),
            }));
        }
        eventAddress.street = street;
        eventAddress.number = number;
        eventAddress.complement = complement;
        eventAddress.neighborhood = neighborhood;
        eventAddress.state = state;
        eventAddress.city = city;
        eventAddress.latitude = latitude;
        eventAddress.longitude = longitude;
        eventAddress.updatedBy = updatedBy;
        await this.eventAddressesRepository.update(eventAddress);
        return (0, either_1.success)({
            eventAddress,
        });
    }
};
exports.EditEventAddressUseCase = EditEventAddressUseCase;
exports.EditEventAddressUseCase = EditEventAddressUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_addresses_repository_1.EventAddressesRepository,
        events_repository_1.EventsRepository])
], EditEventAddressUseCase);
//# sourceMappingURL=edit-event-address.js.map