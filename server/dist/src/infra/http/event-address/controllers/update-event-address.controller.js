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
exports.UpdateEventAddressController = void 0;
const common_1 = require("@nestjs/common");
const library_1 = require("@prisma/client/runtime/library");
const zod_1 = require("zod");
const user_1 = require("../../../../domain/admsjp/enums/user");
const edit_event_address_1 = require("../../../../domain/admsjp/use-cases/event-address/edit-event-address");
const current_user_decorator_1 = require("../../../auth/current-user-decorator");
const profile_guard_1 = require("../../../auth/profile.guard");
const profiles_1 = require("../../../auth/profiles");
const zod_validation_pipe_1 = require("../../pipes/zod-validation-pipe");
const updateEventAddressSchema = zod_1.z.object({
    street: zod_1.z.string().optional(),
    neighborhood: zod_1.z.string().optional(),
    number: zod_1.z.string().optional(),
    complement: zod_1.z.string().optional(),
    state: zod_1.z.coerce.number().positive().min(1).optional(),
    city: zod_1.z.coerce.number().positive().min(1).optional(),
    latitude: zod_1.z.coerce
        .number()
        .refine((value) => {
        return Math.abs(value) <= 90;
    })
        .transform((arg) => new library_1.Decimal(arg))
        .optional(),
    longitude: zod_1.z.coerce
        .number()
        .refine((value) => {
        return Math.abs(value) <= 180;
    })
        .transform((arg) => new library_1.Decimal(arg))
        .optional(),
});
const bodyValidationPipe = new zod_validation_pipe_1.ZodValidationPipe(updateEventAddressSchema);
const UpdateEventAddressParamsSchema = zod_1.z.coerce.number().int().positive();
const paramValidationPipe = new zod_validation_pipe_1.ZodValidationPipe(UpdateEventAddressParamsSchema);
let UpdateEventAddressController = class UpdateEventAddressController {
    updateEventAddress;
    constructor(updateEventAddress) {
        this.updateEventAddress = updateEventAddress;
    }
    async handle(body, id, user) {
        const { street, number, neighborhood, complement, state, city, latitude, longitude, } = body;
        await this.updateEventAddress.execute({
            id,
            street,
            number,
            neighborhood,
            complement,
            state,
            city,
            latitude,
            longitude,
            updatedBy: user.sub.id,
        });
    }
};
exports.UpdateEventAddressController = UpdateEventAddressController;
__decorate([
    (0, profiles_1.Profiles)(user_1.UserProfile.ADMINISTRADOR, user_1.UserProfile.EVENTS),
    (0, common_1.UseGuards)(profile_guard_1.ProfileGuard),
    (0, common_1.Put)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Body)(bodyValidationPipe)),
    __param(1, (0, common_1.Param)('id', paramValidationPipe)),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], UpdateEventAddressController.prototype, "handle", null);
exports.UpdateEventAddressController = UpdateEventAddressController = __decorate([
    (0, common_1.Controller)('/:id'),
    __metadata("design:paramtypes", [edit_event_address_1.EditEventAddressUseCase])
], UpdateEventAddressController);
//# sourceMappingURL=update-event-address.controller.js.map