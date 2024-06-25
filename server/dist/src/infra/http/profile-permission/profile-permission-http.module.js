"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfilePermissionHttpModule = void 0;
const common_1 = require("@nestjs/common");
const find_profile_by_id_1 = require("../../../domain/admsjp/use-cases/profile/find/by-id/find-profile-by-id");
const create_profile_permission_1 = require("../../../domain/admsjp/use-cases/profile-permission/create-profile-permission");
const delete_profile_permission_by_id_1 = require("../../../domain/admsjp/use-cases/profile-permission/delete-profile-permission-by-id");
const get_profile_permission_by_id_1 = require("../../../domain/admsjp/use-cases/profile-permission/get-profile-permission-by-id");
const list_profile_permission_1 = require("../../../domain/admsjp/use-cases/profile-permission/list-profile-permission");
const list_profile_permission_by_profile_id_1 = require("../../../domain/admsjp/use-cases/profile-permission/list-profile-permission-by-profile-id");
const database_module_1 = require("../../database/database.module");
const create_profile_permission_controller_1 = require("./controllers/create-profile-permission.controller");
const delete_profile_permission_by_id_controller_1 = require("./controllers/delete-profile-permission-by-id.controller");
const get_profile_permission_by_id_controller_1 = require("./controllers/get-profile-permission-by-id.controller");
const list_profile_permission_controller_1 = require("./controllers/list-profile-permission.controller");
const list_profile_permission_by_profile_id_controller_1 = require("./controllers/list-profile-permission-by-profile-id.controller");
let ProfilePermissionHttpModule = class ProfilePermissionHttpModule {
};
exports.ProfilePermissionHttpModule = ProfilePermissionHttpModule;
exports.ProfilePermissionHttpModule = ProfilePermissionHttpModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [
            list_profile_permission_controller_1.ListProfilePermissionController,
            list_profile_permission_by_profile_id_controller_1.ListProfilePermissionByProfileIdController,
            get_profile_permission_by_id_controller_1.GetProfilePermissionByIdController,
            create_profile_permission_controller_1.CreateProfilePermissionController,
            delete_profile_permission_by_id_controller_1.DeleteProfilePermissionByIdController,
        ],
        providers: [
            list_profile_permission_1.ListProfilePermissionUseCase,
            list_profile_permission_by_profile_id_1.ListProfilePermissionByProfileIdUseCase,
            get_profile_permission_by_id_1.GetProfilePermissionByIdUseCase,
            create_profile_permission_1.CreateProfilePermissionUseCase,
            delete_profile_permission_by_id_1.DeleteProfilePermissionByIdUseCase,
            find_profile_by_id_1.FindProfileByIdUseCase,
        ],
        exports: [list_profile_permission_by_profile_id_1.ListProfilePermissionByProfileIdUseCase],
    })
], ProfilePermissionHttpModule);
//# sourceMappingURL=profile-permission-http.module.js.map