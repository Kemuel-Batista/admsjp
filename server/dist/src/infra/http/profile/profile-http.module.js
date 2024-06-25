"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileHttpModule = void 0;
const common_1 = require("@nestjs/common");
const create_profile_1 = require("../../../domain/admsjp/use-cases/profile/create/create-profile");
const find_profile_by_id_1 = require("../../../domain/admsjp/use-cases/profile/find/by-id/find-profile-by-id");
const find_profile_by_name_1 = require("../../../domain/admsjp/use-cases/profile/find/by-name/find-profile-by-name");
const list_profile_1 = require("../../../domain/admsjp/use-cases/profile/list/default/list-profile");
const database_module_1 = require("../../database/database.module");
const create_profile_controller_1 = require("./controllers/create-profile.controller");
const list_profile_controller_1 = require("./controllers/list-profile.controller");
let ProfileHttpModule = class ProfileHttpModule {
};
exports.ProfileHttpModule = ProfileHttpModule;
exports.ProfileHttpModule = ProfileHttpModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [list_profile_controller_1.ListProfileController, create_profile_controller_1.CreateProfileController],
        providers: [
            list_profile_1.ListProfileUseCase,
            find_profile_by_id_1.FindProfileByIdUseCase,
            find_profile_by_name_1.FindProfileByNameUseCase,
            create_profile_1.CreateProfileUseCase,
        ],
        exports: [list_profile_1.ListProfileUseCase, find_profile_by_id_1.FindProfileByIdUseCase],
    })
], ProfileHttpModule);
//# sourceMappingURL=profile-http.module.js.map