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
exports.CreateDepartmentController = void 0;
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const user_1 = require("../../../../domain/admsjp/enums/user");
const create_department_1 = require("../../../../domain/admsjp/use-cases/departments/create-department");
const current_user_decorator_1 = require("../../../auth/current-user-decorator");
const profile_guard_1 = require("../../../auth/profile.guard");
const profiles_1 = require("../../../auth/profiles");
const zod_validation_pipe_1 = require("../../pipes/zod-validation-pipe");
const createDepartmentSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
    visible: zod_1.z.number().int().min(0).max(1).optional(),
    status: zod_1.z.number().int().min(0).max(1).optional(),
});
const bodyValidationPipe = new zod_validation_pipe_1.ZodValidationPipe(createDepartmentSchema);
let CreateDepartmentController = class CreateDepartmentController {
    createDepartment;
    constructor(createDepartment) {
        this.createDepartment = createDepartment;
    }
    async handle(body, user) {
        const { name, description, status, visible } = body;
        const profile = await this.createDepartment.execute({
            name,
            description,
            status,
            visible,
            createdBy: user.sub.id,
        });
        return profile;
    }
};
exports.CreateDepartmentController = CreateDepartmentController;
__decorate([
    (0, profiles_1.Profiles)(user_1.UserProfile.ADMINISTRADOR),
    (0, common_1.UseGuards)(profile_guard_1.ProfileGuard),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)(bodyValidationPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CreateDepartmentController.prototype, "handle", null);
exports.CreateDepartmentController = CreateDepartmentController = __decorate([
    (0, common_1.Controller)('/'),
    __metadata("design:paramtypes", [create_department_1.CreateDepartmentUseCase])
], CreateDepartmentController);
//# sourceMappingURL=create-department.controller.js.map