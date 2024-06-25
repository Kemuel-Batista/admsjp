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
exports.EditEventLotController = void 0;
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const user_1 = require("../../../../domain/admsjp/enums/user");
const edit_event_lot_1 = require("../../../../domain/admsjp/use-cases/event-lot/edit-event-lot");
const profile_guard_1 = require("../../../auth/profile.guard");
const profiles_1 = require("../../../auth/profiles");
const zod_validation_pipe_1 = require("../../pipes/zod-validation-pipe");
const editEventLotSchema = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    eventId: zod_1.z.number().int().positive(),
    lot: zod_1.z.number().int().positive(),
    quantity: zod_1.z.number().int().positive(),
    value: zod_1.z.number().int().positive(),
    status: zod_1.z.number().int().positive(),
});
const bodyValidationPipe = new zod_validation_pipe_1.ZodValidationPipe(editEventLotSchema);
let EditEventLotController = class EditEventLotController {
    editEventLot;
    constructor(editEventLot) {
        this.editEventLot = editEventLot;
    }
    async handle(body) {
        const { id, eventId, lot, quantity, status, value } = body;
        await this.editEventLot.execute({
            id,
            eventId,
            lot,
            quantity,
            status,
            value,
        });
    }
};
exports.EditEventLotController = EditEventLotController;
__decorate([
    (0, profiles_1.Profiles)(user_1.UserProfile.ADMINISTRADOR, user_1.UserProfile.EVENTS),
    (0, common_1.UseGuards)(profile_guard_1.ProfileGuard),
    (0, common_1.Put)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Body)(bodyValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EditEventLotController.prototype, "handle", null);
exports.EditEventLotController = EditEventLotController = __decorate([
    (0, common_1.Controller)('/'),
    __metadata("design:paramtypes", [edit_event_lot_1.EditEventLotUseCase])
], EditEventLotController);
//# sourceMappingURL=edit-event-lot.controller.js.map