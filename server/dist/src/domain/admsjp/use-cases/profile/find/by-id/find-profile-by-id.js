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
exports.FindProfileByIdUseCase = void 0;
const common_1 = require("@nestjs/common");
const http_status_code_1 = require("../../../../../../core/enums/http-status-code");
const AppError_1 = require("../../../../../../core/errors/AppError");
const i18n_1 = require("../../../../../../core/i18n/i18n");
const profiles_repository_1 = require("../../../../repositories/profiles-repository");
let FindProfileByIdUseCase = class FindProfileByIdUseCase {
    profilesRepository;
    constructor(profilesRepository) {
        this.profilesRepository = profilesRepository;
    }
    async execute(id, options = {}) {
        const { throwIfNotFound = false, errorKeyNotFound = 'profile.find.notFound', errorCodeNotFound = http_status_code_1.default.NOT_FOUND, } = options;
        let profile = null;
        if (id) {
            profile = await this.profilesRepository.findById(id);
        }
        if (throwIfNotFound && !profile) {
            throw new AppError_1.AppError(i18n_1.i18n.t(errorKeyNotFound, { profile: id }), errorCodeNotFound);
        }
        return profile;
    }
};
exports.FindProfileByIdUseCase = FindProfileByIdUseCase;
exports.FindProfileByIdUseCase = FindProfileByIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [profiles_repository_1.ProfilesRepository])
], FindProfileByIdUseCase);
//# sourceMappingURL=find-profile-by-id.js.map