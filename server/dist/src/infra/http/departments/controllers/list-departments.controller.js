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
exports.ListDepartmentsController = void 0;
const common_1 = require("@nestjs/common");
const query_params_schema_1 = require("../../../../core/schemas/query-params-schema");
const user_1 = require("../../../../domain/admsjp/enums/user");
const list_department_1 = require("../../../../domain/admsjp/use-cases/departments/list-department");
const current_user_decorator_1 = require("../../../auth/current-user-decorator");
const profile_guard_1 = require("../../../auth/profile.guard");
const profiles_1 = require("../../../auth/profiles");
let ListDepartmentsController = class ListDepartmentsController {
    listDepartmentsUseCase;
    constructor(listDepartmentsUseCase) {
        this.listDepartmentsUseCase = listDepartmentsUseCase;
    }
    async handle(query, user, request, response) {
        const { page, pageSize, allRecords } = query;
        const { search } = request.cookies;
        const parsedSearch = search ? JSON.parse(search) : [];
        const parsedAllRecords = allRecords === 'true';
        const options = {
            page,
            pageSize,
            allRecords: parsedAllRecords,
        };
        const result = await this.listDepartmentsUseCase.execute({
            options,
            searchParams: parsedSearch,
            profileId: user.sub.profileId,
        });
        if (result.isError()) {
            throw new common_1.BadRequestException('Error fetching list of departments');
        }
        const { departments, count } = result.value;
        response.setHeader('X-Total-Count', count);
        return response.status(common_1.HttpStatus.OK).json(departments);
    }
};
exports.ListDepartmentsController = ListDepartmentsController;
__decorate([
    (0, profiles_1.Profiles)(user_1.UserProfile.ADMINISTRADOR),
    (0, common_1.UseGuards)(profile_guard_1.ProfileGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)(query_params_schema_1.queryValidationPipe)),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ListDepartmentsController.prototype, "handle", null);
exports.ListDepartmentsController = ListDepartmentsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [list_department_1.ListDepartmentUseCase])
], ListDepartmentsController);
//# sourceMappingURL=list-departments.controller.js.map