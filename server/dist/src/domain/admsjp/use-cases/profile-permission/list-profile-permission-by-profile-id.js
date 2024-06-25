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
exports.ListProfilePermissionByProfileIdUseCase = void 0;
const common_1 = require("@nestjs/common");
const either_1 = require("../../../../core/either");
const resource_not_found_error_1 = require("../../../../core/errors/errors/resource-not-found-error");
const profile_permissions_repository_1 = require("../../repositories/profile-permissions-repository");
const profiles_repository_1 = require("../../repositories/profiles-repository");
let ListProfilePermissionByProfileIdUseCase = class ListProfilePermissionByProfileIdUseCase {
    profilePermissionsRepository;
    profilesRepository;
    constructor(profilePermissionsRepository, profilesRepository) {
        this.profilePermissionsRepository = profilePermissionsRepository;
        this.profilesRepository = profilesRepository;
    }
    async execute({ profileId, options = {}, searchParams = [], }) {
        const profile = await this.profilesRepository.findById(profileId);
        if (!profile) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError({
                errorKey: 'profile.find.notFound',
                key: String(profileId),
            }));
        }
        const profilePermissions = await this.profilePermissionsRepository.listByProfileId(profileId, options, searchParams);
        return (0, either_1.success)({
            profilePermissions,
        });
    }
};
exports.ListProfilePermissionByProfileIdUseCase = ListProfilePermissionByProfileIdUseCase;
exports.ListProfilePermissionByProfileIdUseCase = ListProfilePermissionByProfileIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [profile_permissions_repository_1.ProfilePermissionsRepository,
        profiles_repository_1.ProfilesRepository])
], ListProfilePermissionByProfileIdUseCase);
//# sourceMappingURL=list-profile-permission-by-profile-id.js.map