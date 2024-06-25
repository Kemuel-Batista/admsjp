"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthHttpModule = void 0;
const common_1 = require("@nestjs/common");
const authenticate_user_1 = require("../../../domain/admsjp/use-cases/user/authenticate-user");
const get_user_by_email_1 = require("../../../domain/admsjp/use-cases/user/get-user-by-email");
const register_user_1 = require("../../../domain/admsjp/use-cases/user/register-user");
const cryptography_module_1 = require("../../cryptography/cryptography.module");
const database_module_1 = require("../../database/database.module");
const date_provider_module_1 = require("../../providers/date-provider.module");
const auth_google_controller_1 = require("./controllers/auth-google.controller");
const auth_google_redirect_controller_1 = require("./controllers/auth-google-redirect.controller");
const authenticate_user_controller_1 = require("./controllers/authenticate-user.controller");
const logout_user_controller_1 = require("./controllers/logout-user.controller");
let AuthHttpModule = class AuthHttpModule {
};
exports.AuthHttpModule = AuthHttpModule;
exports.AuthHttpModule = AuthHttpModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, cryptography_module_1.CryptographyModule, date_provider_module_1.DateProviderModule],
        controllers: [
            authenticate_user_controller_1.AuthenticateUserController,
            auth_google_controller_1.AuthGoogleController,
            auth_google_redirect_controller_1.AuthGoogleRedirectController,
            logout_user_controller_1.LogoutUserController,
        ],
        providers: [
            authenticate_user_1.AuthenticateUserUseCase,
            get_user_by_email_1.GetUserByEmailUseCase,
            register_user_1.RegisterUserUseCase,
        ],
    })
], AuthHttpModule);
//# sourceMappingURL=auth-http.module.js.map