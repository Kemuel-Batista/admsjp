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
exports.RegisterUserController = void 0;
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const resource_already_exists_error_1 = require("../../../../core/errors/errors/resource-already-exists-error");
const user_1 = require("../../../../domain/admsjp/enums/user");
const register_user_1 = require("../../../../domain/admsjp/use-cases/user/register-user");
const public_1 = require("../../../auth/public");
const winston_config_1 = require("../../../config/winston-config");
const zod_validation_pipe_1 = require("../../pipes/zod-validation-pipe");
const RegisterUserSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    name: zod_1.z.string().min(3).max(50),
    password: zod_1.z.string().min(6).max(20),
    photo: zod_1.z.string().optional(),
    departmentId: zod_1.z.number().int().positive(),
    profileId: zod_1.z.number().int().positive(),
    status: zod_1.z.nativeEnum(user_1.UserStatus),
});
const bodyValidationPipe = new zod_validation_pipe_1.ZodValidationPipe(RegisterUserSchema);
let RegisterUserController = class RegisterUserController {
    registerUser;
    constructor(registerUser) {
        this.registerUser = registerUser;
    }
    async handle(body) {
        const { email, name, password, photo, status = user_1.UserStatus.ACTIVE, departmentId, profileId, } = body;
        const result = await this.registerUser.execute({
            email,
            name,
            password,
            photo,
            status,
            departmentId,
            profileId,
            provider: 'system',
        });
        if (result.isError()) {
            const error = result.value;
            winston_config_1.logger.error(`Create User Error - ${error.message}`);
            switch (error.constructor) {
                case resource_already_exists_error_1.ResourceAlreadyExistsError:
                    throw new common_1.ConflictException(error.message);
                default:
                    throw new common_1.BadRequestException(error.message);
            }
        }
    }
};
exports.RegisterUserController = RegisterUserController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)(bodyValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RegisterUserController.prototype, "handle", null);
exports.RegisterUserController = RegisterUserController = __decorate([
    (0, common_1.Controller)('/'),
    (0, public_1.Public)(),
    __metadata("design:paramtypes", [register_user_1.RegisterUserUseCase])
], RegisterUserController);
//# sourceMappingURL=register-user.controller.js.map