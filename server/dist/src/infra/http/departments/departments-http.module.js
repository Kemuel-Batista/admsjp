"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentsHttpModule = void 0;
const common_1 = require("@nestjs/common");
const create_department_1 = require("../../../domain/admsjp/use-cases/departments/create-department");
const get_department_by_id_1 = require("../../../domain/admsjp/use-cases/departments/get-department-by-id");
const list_department_1 = require("../../../domain/admsjp/use-cases/departments/list-department");
const database_module_1 = require("../../database/database.module");
const create_department_controller_1 = require("./controllers/create-department.controller");
const get_department_by_id_controller_1 = require("./controllers/get-department-by-id.controller");
const list_departments_controller_1 = require("./controllers/list-departments.controller");
let DepartmentsHttpModule = class DepartmentsHttpModule {
};
exports.DepartmentsHttpModule = DepartmentsHttpModule;
exports.DepartmentsHttpModule = DepartmentsHttpModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [
            list_departments_controller_1.ListDepartmentsController,
            create_department_controller_1.CreateDepartmentController,
            get_department_by_id_controller_1.GetDepartmentByIdController,
        ],
        providers: [
            list_department_1.ListDepartmentUseCase,
            get_department_by_id_1.GetDepartmentByIdUseCase,
            create_department_1.CreateDepartmentUseCase,
        ],
    })
], DepartmentsHttpModule);
//# sourceMappingURL=departments-http.module.js.map