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
exports.GetDepartmentByIdController = void 0;
const common_1 = require("@nestjs/common");
const zod_1 = require("zod");
const get_department_by_id_1 = require("../../../../domain/admsjp/use-cases/departments/get-department-by-id");
const public_1 = require("../../../auth/public");
const zod_validation_pipe_1 = require("../../pipes/zod-validation-pipe");
const paramsSchema = zod_1.z.coerce.number().int().positive();
const paramValidationPipe = new zod_validation_pipe_1.ZodValidationPipe(paramsSchema);
let GetDepartmentByIdController = class GetDepartmentByIdController {
    getDepartmentById;
    constructor(getDepartmentById) {
        this.getDepartmentById = getDepartmentById;
    }
    async handle(id) {
        const result = await this.getDepartmentById.execute({
            id,
        });
        if (result.isError()) {
            throw new common_1.BadRequestException();
        }
        return {
            department: result.value.department,
        };
    }
};
exports.GetDepartmentByIdController = GetDepartmentByIdController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('id', paramValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GetDepartmentByIdController.prototype, "handle", null);
exports.GetDepartmentByIdController = GetDepartmentByIdController = __decorate([
    (0, common_1.Controller)('/:id'),
    (0, public_1.Public)(),
    __metadata("design:paramtypes", [get_department_by_id_1.GetDepartmentByIdUseCase])
], GetDepartmentByIdController);
//# sourceMappingURL=get-department-by-id.controller.js.map