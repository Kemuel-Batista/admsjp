"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserHttpModule = void 0;
const common_1 = require("@nestjs/common");
const register_user_1 = require("../../../domain/admsjp/use-cases/user/register-user");
const cryptography_module_1 = require("../../cryptography/cryptography.module");
const database_module_1 = require("../../database/database.module");
const register_user_controller_1 = require("./controllers/register-user.controller");
let UserHttpModule = class UserHttpModule {
};
exports.UserHttpModule = UserHttpModule;
exports.UserHttpModule = UserHttpModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, cryptography_module_1.CryptographyModule],
        controllers: [register_user_controller_1.RegisterUserController],
        providers: [register_user_1.RegisterUserUseCase],
    })
], UserHttpModule);
//# sourceMappingURL=user-http.module.js.map