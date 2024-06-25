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
exports.EditParameterController = void 0;
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const user_1 = require("../../../../domain/admsjp/enums/user");
const edit_parameter_1 = require("../../../../domain/admsjp/use-cases/parameters/edit-parameter");
const current_user_decorator_1 = require("../../../auth/current-user-decorator");
const profile_guard_1 = require("../../../auth/profile.guard");
const profiles_1 = require("../../../auth/profiles");
const zod_validation_pipe_1 = require("../../pipes/zod-validation-pipe");
const editParameterSchema = zod_1.z.object({
    key: zod_1.z.string(),
    keyInfo: zod_1.z.string(),
    value: zod_1.z.string(),
    visible: zod_1.z.number().int().min(0).max(1).optional(),
    status: zod_1.z.number().int().min(0).max(1).optional(),
});
const bodyValidationPipe = new zod_validation_pipe_1.ZodValidationPipe(editParameterSchema);
const editEventParamSchema = zod_1.z.coerce.number().int().positive();
const paramValidationPipe = new zod_validation_pipe_1.ZodValidationPipe(editEventParamSchema);
let EditParameterController = class EditParameterController {
    editParameter;
    constructor(editParameter) {
        this.editParameter = editParameter;
    }
    async handle(id, body, user) {
        const { key, keyInfo, value, status, visible } = body;
        const parameter = await this.editParameter.execute({
            id,
            key,
            keyInfo,
            value,
            visible,
            status,
            updatedBy: user.sub.id,
        });
        return {
            parameter,
        };
    }
};
exports.EditParameterController = EditParameterController;
__decorate([
    (0, profiles_1.Profiles)(user_1.UserProfile.ADMINISTRADOR),
    (0, common_1.UseGuards)(profile_guard_1.ProfileGuard),
    (0, common_1.Put)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', paramValidationPipe)),
    __param(1, (0, common_1.Body)(bodyValidationPipe)),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], EditParameterController.prototype, "handle", null);
exports.EditParameterController = EditParameterController = __decorate([
    (0, common_1.Controller)('/:id'),
    __metadata("design:paramtypes", [edit_parameter_1.EditParameterUseCase])
], EditParameterController);
//# sourceMappingURL=edit-parameter.controller.js.map