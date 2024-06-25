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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGoogleRedirectController = void 0;
const common_1 = require("@nestjs/common");
const user_1 = require("../../../../domain/admsjp/enums/user");
const authenticate_user_1 = require("../../../../domain/admsjp/use-cases/user/authenticate-user");
const get_user_by_email_1 = require("../../../../domain/admsjp/use-cases/user/get-user-by-email");
const register_user_1 = require("../../../../domain/admsjp/use-cases/user/register-user");
const google_oauth_guard_1 = require("../../../auth/google-oauth.guard");
const public_1 = require("../../../auth/public");
let AuthGoogleRedirectController = class AuthGoogleRedirectController {
    getUserByEmail;
    authenticateUser;
    registerUser;
    constructor(getUserByEmail, authenticateUser, registerUser) {
        this.getUserByEmail = getUserByEmail;
        this.authenticateUser = authenticateUser;
        this.registerUser = registerUser;
    }
    async handle(request, response) {
        const reqUser = request.user;
        const user = await this.getUserByEmail.execute({
            email: reqUser.email,
        });
        let accessToken;
        if (user) {
            const result = await this.authenticateUser.execute({
                email: user.email,
                password: '123456',
            });
            if (result.isError()) {
                response.redirect(`${process.env.APP_BASE_URL}`);
                return;
            }
            accessToken = result.value.accessToken;
        }
        else {
            await this.registerUser.execute({
                name: `${reqUser.firstName} ${reqUser.lastName}`,
                email: reqUser.email,
                password: '123456',
                photo: reqUser.picture,
                provider: 'google',
                profileId: 2,
                departmentId: 3,
                status: user_1.UserStatus.ACTIVE,
            });
            const result = await this.authenticateUser.execute({
                email: reqUser.email,
                password: '123456',
            });
            if (result.isError()) {
                response.redirect(`${process.env.APP_BASE_URL}`);
                return;
            }
            accessToken = result.value.accessToken;
        }
        response.cookie('nextauth_token', accessToken, {
            expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
            httpOnly: true,
            path: '/',
            secure: true,
            sameSite: 'strict',
        });
        response.redirect(`${process.env.APP_BASE_URL}`);
    }
};
exports.AuthGoogleRedirectController = AuthGoogleRedirectController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(google_oauth_guard_1.GoogleOAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthGoogleRedirectController.prototype, "handle", null);
exports.AuthGoogleRedirectController = AuthGoogleRedirectController = __decorate([
    (0, common_1.Controller)('/google-redirect'),
    (0, public_1.Public)(),
    __metadata("design:paramtypes", [get_user_by_email_1.GetUserByEmailUseCase,
        authenticate_user_1.AuthenticateUserUseCase,
        register_user_1.RegisterUserUseCase])
], AuthGoogleRedirectController);
//# sourceMappingURL=auth-google-redirect.controller.js.map