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
exports.ListProfilePermissionController = void 0;
const common_1 = require("@nestjs/common");
const query_params_schema_1 = require("../../../../core/schemas/query-params-schema");
const user_1 = require("../../../../domain/admsjp/enums/user");
const list_profile_permission_1 = require("../../../../domain/admsjp/use-cases/profile-permission/list-profile-permission");
const profile_guard_1 = require("../../../auth/profile.guard");
const profiles_1 = require("../../../auth/profiles");
let ListProfilePermissionController = class ListProfilePermissionController {
    listProfilePermission;
    constructor(listProfilePermission) {
        this.listProfilePermission = listProfilePermission;
    }
    async handle(query, request) {
        const { page, pageSize, allRecords } = query;
        const { search } = request.cookies;
        const parsedSearch = search ? JSON.parse(search) : [];
        const parsedAllRecords = allRecords === 'true';
        const options = {
            page,
            pageSize,
            allRecords: parsedAllRecords,
        };
        const result = await this.listProfilePermission.execute({
            options,
            searchParams: parsedSearch,
        });
        if (result.isError()) {
            throw new common_1.BadRequestException();
        }
        const profilePermissions = result.value.profilePermissions;
        return {
            profilePermissions,
        };
    }
};
exports.ListProfilePermissionController = ListProfilePermissionController;
__decorate([
    (0, profiles_1.Profiles)(user_1.UserProfile.ADMINISTRADOR),
    (0, common_1.UseGuards)(profile_guard_1.ProfileGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(query_params_schema_1.queryValidationPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ListProfilePermissionController.prototype, "handle", null);
exports.ListProfilePermissionController = ListProfilePermissionController = __decorate([
    (0, common_1.Controller)('/'),
    __metadata("design:paramtypes", [list_profile_permission_1.ListProfilePermissionUseCase])
], ListProfilePermissionController);
//# sourceMappingURL=list-profile-permission.controller.js.map