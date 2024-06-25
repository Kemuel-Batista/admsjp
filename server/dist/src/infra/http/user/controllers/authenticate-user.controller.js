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
exports.AuthenticateUserController = void 0;
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const wrong_credentials_error_1 = require("../../../../core/errors/errors/wrong-credentials-error");
const authenticate_user_1 = require("../../../../domain/admsjp/use-cases/user/authenticate-user");
const public_1 = require("../../../auth/public");
const winston_config_1 = require("../../../config/winston-config");
const zod_validation_pipe_1 = require("../../pipes/zod-validation-pipe");
const authenticateUserSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6).max(20),
});
const bodyValidationPipe = new zod_validation_pipe_1.ZodValidationPipe(authenticateUserSchema);
let AuthenticateUserController = class AuthenticateUserController {
    authenticateUser;
    constructor(authenticateUser) {
        this.authenticateUser = authenticateUser;
    }
    async handle(body, response) {
        const { email, password } = body;
        const result = await this.authenticateUser.execute({ email, password });
        if (result.isError()) {
            const error = result.value;
            winston_config_1.logger.error(`Authenticate User Error - ${error.message}`);
            switch (error.constructor) {
                case wrong_credentials_error_1.WrongCredentialsError:
                    throw new common_1.UnauthorizedException(error.message);
                default:
                    throw new common_1.BadRequestException(error.message);
            }
        }
        const { accessToken, userProvider } = result.value;
        if (userProvider !== 'system') {
            throw new common_1.UnauthorizedException('Logue-se com a sua conta google!');
        }
        return response
            .cookie('nextauth_token', accessToken, {
            expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
            httpOnly: true,
            path: '/',
            secure: true,
            sameSite: true,
        })
            .status(200)
            .send();
    }
};
exports.AuthenticateUserController = AuthenticateUserController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)(bodyValidationPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthenticateUserController.prototype, "handle", null);
exports.AuthenticateUserController = AuthenticateUserController = __decorate([
    (0, common_1.Controller)('/session'),
    (0, public_1.Public)(),
    __metadata("design:paramtypes", [authenticate_user_1.AuthenticateUserUseCase])
], AuthenticateUserController);
//# sourceMappingURL=authenticate-user.controller.js.map