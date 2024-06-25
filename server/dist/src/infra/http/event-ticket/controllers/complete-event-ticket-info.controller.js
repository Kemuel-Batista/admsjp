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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompleteEventTicketInfoController = void 0;
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const incorrect_association_error_1 = require("../../../../core/errors/errors/incorrect-association-error");
const resource_not_found_error_1 = require("../../../../core/errors/errors/resource-not-found-error");
const complete_event_ticket_info_1 = require("../../../../domain/admsjp/use-cases/event-ticket/complete-event-ticket-info");
const current_user_decorator_1 = require("../../../auth/current-user-decorator");
const zod_validation_pipe_1 = require("../../pipes/zod-validation-pipe");
const completeEventTicketInfoSchema = zod_1.z.object({
    data: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string().uuid(),
        eventPurchaseId: zod_1.z.string().uuid(),
        name: zod_1.z.string(),
        email: zod_1.z.string().email(),
        cpf: zod_1.z.string().min(11).max(11),
        phone: zod_1.z.string().max(11),
        birthday: zod_1.z.string().transform((arg) => new Date(arg)),
    })),
});
const bodyValidationPipe = new zod_validation_pipe_1.ZodValidationPipe(completeEventTicketInfoSchema);
let CompleteEventTicketInfoController = class CompleteEventTicketInfoController {
    completeEventTicketInfo;
    constructor(completeEventTicketInfo) {
        this.completeEventTicketInfo = completeEventTicketInfo;
    }
    async handle(body, user) {
        const { data } = body;
        for (const eventTicket of data) {
            const result = await this.completeEventTicketInfo.execute({
                id: eventTicket.id,
                eventPurchaseId: eventTicket.eventPurchaseId,
                name: eventTicket.name,
                email: eventTicket.email,
                cpf: eventTicket.cpf,
                phone: eventTicket.phone,
                birthday: eventTicket.birthday,
                requestedBy: user.sub.id,
            });
            if (result.isError()) {
                const error = result.value;
                switch (error.constructor) {
                    case resource_not_found_error_1.ResourceNotFoundError:
                        throw new common_1.NotFoundException(error.message);
                    case incorrect_association_error_1.IncorrectAssociationError:
                        throw new common_1.PreconditionFailedException(error.message);
                    default:
                        throw new common_1.BadRequestException(error.message);
                }
            }
        }
    }
};
exports.CompleteEventTicketInfoController = CompleteEventTicketInfoController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)(bodyValidationPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CompleteEventTicketInfoController.prototype, "handle", null);
exports.CompleteEventTicketInfoController = CompleteEventTicketInfoController = __decorate([
    (0, common_1.Controller)('/info'),
    __metadata("design:paramtypes", [complete_event_ticket_info_1.CompleteEventTicketInfoUseCase])
], CompleteEventTicketInfoController);
//# sourceMappingURL=complete-event-ticket-info.controller.js.map