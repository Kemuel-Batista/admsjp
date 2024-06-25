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
exports.CreateDepartmentUseCase = void 0;
const common_1 = require("@nestjs/common");
const either_1 = require("../../../../core/either");
const resource_already_exists_error_1 = require("../../../../core/errors/errors/resource-already-exists-error");
const departments_repository_1 = require("../../repositories/departments-repository");
let CreateDepartmentUseCase = class CreateDepartmentUseCase {
    departmentsRepository;
    constructor(departmentsRepository) {
        this.departmentsRepository = departmentsRepository;
    }
    async execute({ name, description, status = 1, visible = 1, createdBy, }) {
        const departmentAlreadyExists = await this.departmentsRepository.findByName(name);
        if (departmentAlreadyExists) {
            return (0, either_1.failure)(new resource_already_exists_error_1.ResourceAlreadyExistsError({
                errorKey: 'department.create.keyAlreadyExists',
                key: name,
            }));
        }
        const department = await this.departmentsRepository.create({
            name,
            description,
            status,
            visible,
            createdBy,
        });
        return (0, either_1.success)({
            department,
        });
    }
};
exports.CreateDepartmentUseCase = CreateDepartmentUseCase;
exports.CreateDepartmentUseCase = CreateDepartmentUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [departments_repository_1.DepartmentsRepository])
], CreateDepartmentUseCase);
//# sourceMappingURL=create-department.js.map