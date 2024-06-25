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
exports.FindParameterByIdUseCase = void 0;
const common_1 = require("@nestjs/common");
const either_1 = require("../../../../core/either");
const resource_not_found_error_1 = require("../../../../core/errors/errors/resource-not-found-error");
const parameters_repository_1 = require("../../repositories/parameters-repository");
let FindParameterByIdUseCase = class FindParameterByIdUseCase {
    parametersRepository;
    constructor(parametersRepository) {
        this.parametersRepository = parametersRepository;
    }
    async execute({ id, }) {
        const parameter = await this.parametersRepository.findById(id);
        if (!parameter) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError({
                errorKey: 'parameter.find.notFound',
                key: id.toString(),
            }));
        }
        return (0, either_1.success)({
            parameter,
        });
    }
};
exports.FindParameterByIdUseCase = FindParameterByIdUseCase;
exports.FindParameterByIdUseCase = FindParameterByIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [parameters_repository_1.ParametersRepository])
], FindParameterByIdUseCase);
//# sourceMappingURL=find-parameter-by-id.js.map