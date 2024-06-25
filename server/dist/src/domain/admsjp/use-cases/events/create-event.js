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
exports.CreateEventUseCase = void 0;
const common_1 = require("@nestjs/common");
const either_1 = require("../../../../core/either");
const invalid_attachment_type_error_1 = require("../../../../core/errors/errors/invalid-attachment-type-error");
const resource_already_exists_error_1 = require("../../../../core/errors/errors/resource-already-exists-error");
const slug_1 = require("../../../../core/util/slug/slug");
const event_1 = require("../../enums/event");
const events_repository_1 = require("../../repositories/events-repository");
const uploader_1 = require("../../storage/uploader");
const create_event_address_1 = require("../event-address/create-event-address");
const create_event_lot_1 = require("../event-lot/create-event-lot");
let CreateEventUseCase = class CreateEventUseCase {
    eventsRepository;
    createEventLotUseCase;
    createEventAddressUseCase;
    uploader;
    constructor(eventsRepository, createEventLotUseCase, createEventAddressUseCase, uploader) {
        this.eventsRepository = eventsRepository;
        this.createEventLotUseCase = createEventLotUseCase;
        this.createEventAddressUseCase = createEventAddressUseCase;
        this.uploader = uploader;
    }
    async execute({ title, description, initialDate, finalDate, status = event_1.EventStatus.ACTIVE, visible = event_1.EventVisible.VISIBLE, eventType, departmentId, fileName, fileType, body, lots, address, message, pixKey, pixType, createdBy, }) {
        if (!/^(image\/(jpeg|png|webp))$|^application\/pdf$|^video\/mp4$/.test(fileType)) {
            return (0, either_1.failure)(new invalid_attachment_type_error_1.InvalidAttachmentTypeError({
                errorKey: 'event.create.invalidAttachmentType',
                key: fileType,
            }));
        }
        const eventAlreadyExistsWithTitle = await this.eventsRepository.findByTitle(title);
        if (eventAlreadyExistsWithTitle) {
            return (0, either_1.failure)(new resource_already_exists_error_1.ResourceAlreadyExistsError({
                errorKey: 'event.create.keyAlreadyExists',
                key: title,
            }));
        }
        const { value: slug } = slug_1.Slug.createFromText(title);
        const eventAlreadyExistsWithSlug = await this.eventsRepository.findBySlug(slug);
        if (eventAlreadyExistsWithSlug) {
            return (0, either_1.failure)(new resource_already_exists_error_1.ResourceAlreadyExistsError({
                errorKey: 'event.create.keyAlreadyExists',
                key: slug,
            }));
        }
        const event = await this.eventsRepository.create({
            title,
            slug,
            description,
            initialDate,
            finalDate,
            status,
            visible,
            eventType,
            departmentId,
            imagePath: '',
            message,
            pixKey,
            pixType,
            createdBy,
        });
        for (const lot of lots) {
            await this.createEventLotUseCase.execute({
                ...lot,
                createdBy,
                eventId: event.id,
            });
        }
        if (eventType !== event_1.EventType.REMOTO) {
            await this.createEventAddressUseCase.execute({
                ...address,
                createdBy,
                eventId: event.id,
            });
        }
        const { url } = await this.uploader.upload({
            fileName,
            fileType,
            body,
        });
        event.imagePath = url;
        await this.eventsRepository.update(event);
        return (0, either_1.success)({
            event,
        });
    }
};
exports.CreateEventUseCase = CreateEventUseCase;
exports.CreateEventUseCase = CreateEventUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [events_repository_1.EventsRepository,
        create_event_lot_1.CreateEventLotUseCase,
        create_event_address_1.CreateEventAddressUseCase,
        uploader_1.Uploader])
], CreateEventUseCase);
//# sourceMappingURL=create-event.js.map