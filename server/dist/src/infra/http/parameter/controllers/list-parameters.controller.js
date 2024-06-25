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
exports.ListParametersController = void 0;
const common_1 = require("@nestjs/common");
const user_1 = require("../../../../domain/admsjp/enums/user");
const list_parameters_1 = require("../../../../domain/admsjp/use-cases/parameters/list-parameters");
const profile_guard_1 = require("../../../auth/profile.guard");
const profiles_1 = require("../../../auth/profiles");
let ListParametersController = class ListParametersController {
    listParametersUseCase;
    constructor(listParametersUseCase) {
        this.listParametersUseCase = listParametersUseCase;
    }
    async handle() {
        const result = await this.listParametersUseCase.execute({});
        if (result.isError()) {
            throw new common_1.BadRequestException();
        }
        const { parameters, count } = result.value;
        return {
            parameters,
            count,
        };
    }
};
exports.ListParametersController = ListParametersController;
__decorate([
    (0, profiles_1.Profiles)(user_1.UserProfile.ADMINISTRADOR),
    (0, common_1.UseGuards)(profile_guard_1.ProfileGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ListParametersController.prototype, "handle", null);
exports.ListParametersController = ListParametersController = __decorate([
    (0, common_1.Controller)('/'),
    __metadata("design:paramtypes", [list_parameters_1.ListParametersUseCase])
], ListParametersController);
//# sourceMappingURL=list-parameters.controller.js.map