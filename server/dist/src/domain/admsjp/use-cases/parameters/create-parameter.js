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
exports.CreateParameterUseCase = void 0;
const common_1 = require("@nestjs/common");
const either_1 = require("../../../../core/either");
const resource_already_exists_error_1 = require("../../../../core/errors/errors/resource-already-exists-error");
const resource_not_found_error_1 = require("../../../../core/errors/errors/resource-not-found-error");
const parameters_repository_1 = require("../../repositories/parameters-repository");
const users_repository_1 = require("../../repositories/users-repository");
let CreateParameterUseCase = class CreateParameterUseCase {
    parametersRepository;
    usersRepository;
    constructor(parametersRepository, usersRepository) {
        this.parametersRepository = parametersRepository;
        this.usersRepository = usersRepository;
    }
    async execute({ key, keyInfo, value, status, visible, createdBy, }) {
        const user = await this.usersRepository.findById(createdBy);
        if (!user) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError({
                errorKey: 'user.find.id.notFound',
            }));
        }
        const parameterAlreadyExists = await this.parametersRepository.findByKey(key);
        if (parameterAlreadyExists) {
            return (0, either_1.failure)(new resource_already_exists_error_1.ResourceAlreadyExistsError({
                errorKey: 'parameter.create.alreadyExists',
            }));
        }
        const parameter = await this.parametersRepository.create({
            key,
            keyInfo,
            value,
            status,
            visible,
            createdBy,
        });
        return (0, either_1.success)({
            parameter,
        });
    }
};
exports.CreateParameterUseCase = CreateParameterUseCase;
exports.CreateParameterUseCase = CreateParameterUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [parameters_repository_1.ParametersRepository,
        users_repository_1.UsersRepository])
], CreateParameterUseCase);
//# sourceMappingURL=create-parameter.js.map