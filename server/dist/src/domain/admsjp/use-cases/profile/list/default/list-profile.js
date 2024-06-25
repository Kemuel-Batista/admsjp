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
exports.ListProfileUseCase = void 0;
const common_1 = require("@nestjs/common");
const user_1 = require("../../../../enums/user");
const profiles_repository_1 = require("../../../../repositories/profiles-repository");
let ListProfileUseCase = class ListProfileUseCase {
    profilesRepository;
    constructor(profilesRepository) {
        this.profilesRepository = profilesRepository;
    }
    async execute(options = {}, searchParams = [], profileId) {
        if (profileId !== user_1.UserProfile.ADMINISTRADOR) {
            searchParams.push({
                condition: 'equals',
                field: 'visible',
                value: 1,
            });
        }
        const { profiles, count } = await this.profilesRepository.list(options, searchParams);
        return { profiles, count };
    }
};
exports.ListProfileUseCase = ListProfileUseCase;
exports.ListProfileUseCase = ListProfileUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [profiles_repository_1.ProfilesRepository])
], ListProfileUseCase);
//# sourceMappingURL=list-profile.js.map