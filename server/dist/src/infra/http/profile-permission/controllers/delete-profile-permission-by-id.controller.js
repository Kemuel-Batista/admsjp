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
exports.DeleteProfilePermissionByIdController = void 0;
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const user_1 = require("../../../../domain/admsjp/enums/user");
const delete_profile_permission_by_id_1 = require("../../../../domain/admsjp/use-cases/profile-permission/delete-profile-permission-by-id");
const current_user_decorator_1 = require("../../../auth/current-user-decorator");
const profile_guard_1 = require("../../../auth/profile.guard");
const profiles_1 = require("../../../auth/profiles");
const zod_validation_pipe_1 = require("../../pipes/zod-validation-pipe");
const deleteProfilePermissionSchema = zod_1.z.coerce.number().int().positive();
const paramValidationPipe = new zod_validation_pipe_1.ZodValidationPipe(deleteProfilePermissionSchema);
let DeleteProfilePermissionByIdController = class DeleteProfilePermissionByIdController {
    deleteProfilePermissionById;
    constructor(deleteProfilePermissionById) {
        this.deleteProfilePermissionById = deleteProfilePermissionById;
    }
    async handle(id, user) {
        await this.deleteProfilePermissionById.execute({
            id,
            deletedBy: user.sub.id,
        });
    }
};
exports.DeleteProfilePermissionByIdController = DeleteProfilePermissionByIdController;
__decorate([
    (0, profiles_1.Profiles)(user_1.UserProfile.ADMINISTRADOR),
    (0, common_1.UseGuards)(profile_guard_1.ProfileGuard),
    (0, common_1.Delete)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', paramValidationPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], DeleteProfilePermissionByIdController.prototype, "handle", null);
exports.DeleteProfilePermissionByIdController = DeleteProfilePermissionByIdController = __decorate([
    (0, common_1.Controller)('/:id'),
    __metadata("design:paramtypes", [delete_profile_permission_by_id_1.DeleteProfilePermissionByIdUseCase])
], DeleteProfilePermissionByIdController);
//# sourceMappingURL=delete-profile-permission-by-id.controller.js.map