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
exports.GetUserPermissionController = void 0;
const common_1 = require("@nestjs/common");
const get_user_permission_1 = require("../../../../domain/admsjp/use-cases/user/get-user-permission");
const current_user_decorator_1 = require("../../../auth/current-user-decorator");
let GetUserPermissionController = class GetUserPermissionController {
    getUserPermission;
    constructor(getUserPermission) {
        this.getUserPermission = getUserPermission;
    }
    async handle(user) {
        const result = await this.getUserPermission.execute({
            userId: user.sub.id,
        });
        if (result.isError()) {
            throw new common_1.BadRequestException('Erro ao carregar as permissões');
        }
        const userPermission = result.value.userWithPermission;
        return {
            user: userPermission,
        };
    }
};
exports.GetUserPermissionController = GetUserPermissionController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GetUserPermissionController.prototype, "handle", null);
exports.GetUserPermissionController = GetUserPermissionController = __decorate([
    (0, common_1.Controller)('/me'),
    __metadata("design:paramtypes", [get_user_permission_1.GetUserPermissionUseCase])
], GetUserPermissionController);
//# sourceMappingURL=get-user-permission.controller.js.map