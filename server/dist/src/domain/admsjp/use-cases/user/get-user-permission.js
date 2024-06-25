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
exports.GetUserPermissionUseCase = void 0;
const common_1 = require("@nestjs/common");
const either_1 = require("../../../../core/either");
const resource_not_found_error_1 = require("../../../../core/errors/errors/resource-not-found-error");
const profile_permissions_repository_1 = require("../../repositories/profile-permissions-repository");
const users_repository_1 = require("../../repositories/users-repository");
let GetUserPermissionUseCase = class GetUserPermissionUseCase {
    usersRepository;
    profilePermissionsRepository;
    constructor(usersRepository, profilePermissionsRepository) {
        this.usersRepository = usersRepository;
        this.profilePermissionsRepository = profilePermissionsRepository;
    }
    async execute({ userId, }) {
        const user = await this.usersRepository.findById(userId);
        if (!user) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError({
                errorKey: 'user.find.notFound',
                key: userId.toString(),
            }));
        }
        const profilePermissions = await this.profilePermissionsRepository.listByProfileId(user.profileId);
        const permissions = new Set([]);
        for (const profilePermission of profilePermissions) {
            permissions.add(profilePermission.key);
        }
        delete user.password;
        const userWithPermission = {
            ...user,
            permissions: [...permissions],
        };
        return (0, either_1.success)({
            userWithPermission,
        });
    }
};
exports.GetUserPermissionUseCase = GetUserPermissionUseCase;
exports.GetUserPermissionUseCase = GetUserPermissionUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        profile_permissions_repository_1.ProfilePermissionsRepository])
], GetUserPermissionUseCase);
//# sourceMappingURL=get-user-permission.js.map