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
exports.ListProfilePermissionUseCase = void 0;
const common_1 = require("@nestjs/common");
const either_1 = require("../../../../core/either");
const profile_permissions_repository_1 = require("../../repositories/profile-permissions-repository");
let ListProfilePermissionUseCase = class ListProfilePermissionUseCase {
    profilePermissionRepository;
    constructor(profilePermissionRepository) {
        this.profilePermissionRepository = profilePermissionRepository;
    }
    async execute({ options = {}, searchParams = [], }) {
        const profilePermissions = await this.profilePermissionRepository.list(options, searchParams);
        return (0, either_1.success)({
            profilePermissions,
        });
    }
};
exports.ListProfilePermissionUseCase = ListProfilePermissionUseCase;
exports.ListProfilePermissionUseCase = ListProfilePermissionUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [profile_permissions_repository_1.ProfilePermissionsRepository])
], ListProfilePermissionUseCase);
//# sourceMappingURL=list-profile-permission.js.map