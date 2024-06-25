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
exports.CreateProfileUseCase = void 0;
const common_1 = require("@nestjs/common");
const profiles_repository_1 = require("../../../repositories/profiles-repository");
const find_profile_by_name_1 = require("../find/by-name/find-profile-by-name");
let CreateProfileUseCase = class CreateProfileUseCase {
    profilesRepository;
    findProfileByName;
    constructor(profilesRepository, findProfileByName) {
        this.profilesRepository = profilesRepository;
        this.findProfileByName = findProfileByName;
    }
    async execute({ name, status = 1, visible = 1, createdBy, }) {
        await this.findProfileByName.execute(name, {
            throwIfFound: true,
        });
        const profile = await this.profilesRepository.create({
            name,
            status,
            visible,
            createdBy,
        });
        return profile;
    }
};
exports.CreateProfileUseCase = CreateProfileUseCase;
exports.CreateProfileUseCase = CreateProfileUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [profiles_repository_1.ProfilesRepository,
        find_profile_by_name_1.FindProfileByNameUseCase])
], CreateProfileUseCase);
//# sourceMappingURL=create-profile.js.map