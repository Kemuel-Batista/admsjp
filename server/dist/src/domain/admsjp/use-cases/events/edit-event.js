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
exports.EditEventUseCase = void 0;
const node_fs_1 = require("node:fs");
const node_path_1 = require("node:path");
const common_1 = require("@nestjs/common");
const handlebars_1 = require("handlebars");
const either_1 = require("../../../../core/either");
const invalid_attachment_type_error_1 = require("../../../../core/errors/errors/invalid-attachment-type-error");
const resource_already_exists_error_1 = require("../../../../core/errors/errors/resource-already-exists-error");
const resource_not_found_error_1 = require("../../../../core/errors/errors/resource-not-found-error");
const slug_1 = require("../../../../core/util/slug/slug");
const events_repository_1 = require("../../repositories/events-repository");
const uploader_1 = require("../../storage/uploader");
const mail_notifier_1 = require("../../notifiers/mail-notifier");
const event_purchases_repository_1 = require("../../repositories/event-purchases-repository");
let EditEventUseCase = class EditEventUseCase {
    eventsRepository;
    eventPurchasesRepository;
    uploader;
    mailNotifier;
    constructor(eventsRepository, eventPurchasesRepository, uploader, mailNotifier) {
        this.eventsRepository = eventsRepository;
        this.eventPurchasesRepository = eventPurchasesRepository;
        this.uploader = uploader;
        this.mailNotifier = mailNotifier;
    }
    async execute({ id, title, description, initialDate, finalDate, status, visible, eventType, fileName, fileType, body, message, updatedBy, }) {
        const event = await this.eventsRepository.findById(id);
        if (!event) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError({
                errorKey: 'event.find.notFound',
                key: String(id),
            }));
        }
        if (event.title !== title) {
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
            event.title = title;
            event.slug = slug;
        }
        if (fileName && fileType && body) {
            if (!/^(image\/(jpeg|png|webp))$|^application\/pdf$|^video\/mp4$/.test(fileType)) {
                return (0, either_1.failure)(new invalid_attachment_type_error_1.InvalidAttachmentTypeError({
                    errorKey: 'event.create.invalidAttachmentType',
                    key: fileType,
                }));
            }
            await this.uploader.delete(event.imagePath);
            const { url } = await this.uploader.upload({
                fileName,
                fileType,
                body,
            });
            event.imagePath = url;
        }
        let renderedHtml = '';
        if (event.initialDate !== initialDate ||
            event.finalDate !== finalDate ||
            event.eventType !== eventType) {
            const htmlPath = (0, node_path_1.join)(__dirname, '..', '..', 'views', 'event-updated.hbs');
            const templateHtml = (0, node_fs_1.readFileSync)(htmlPath, 'utf-8');
            const compiledTemplate = handlebars_1.default.compile(templateHtml);
            renderedHtml = compiledTemplate({
                initialDate: initialDate.toLocaleDateString(),
                finalDate: finalDate.toLocaleDateString(),
                eventType,
            });
        }
        event.description = description;
        event.initialDate = initialDate;
        event.finalDate = finalDate;
        event.status = status;
        event.visible = visible;
        event.eventType = eventType;
        event.message = message;
        event.updatedBy = updatedBy;
        await this.eventsRepository.update(event);
        const eventPurchases = await this.eventPurchasesRepository.listBuyerDetailsByEventId(event.id);
        for (const eventPurchase of eventPurchases) {
            await this.mailNotifier.send({
                email: eventPurchase.user.email,
                title: 'Evento foi atualizado!',
                content: 'O evento que você tem uma inscrição foi atualizado! Verique os detalhes abaixo.',
                renderedHtml,
            });
        }
        return (0, either_1.success)({
            event,
        });
    }
};
exports.EditEventUseCase = EditEventUseCase;
exports.EditEventUseCase = EditEventUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [events_repository_1.EventsRepository,
        event_purchases_repository_1.EventPurchasesRepository,
        uploader_1.Uploader,
        mail_notifier_1.MailNotifier])
], EditEventUseCase);
//# sourceMappingURL=edit-event.js.map