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
exports.EditParameterUseCase = void 0;
const common_1 = require("@nestjs/common");
const either_1 = require("../../../../core/either");
const resource_already_exists_error_1 = require("../../../../core/errors/errors/resource-already-exists-error");
const resource_not_found_error_1 = require("../../../../core/errors/errors/resource-not-found-error");
const parameters_repository_1 = require("../../repositories/parameters-repository");
const users_repository_1 = require("../../repositories/users-repository");
let EditParameterUseCase = class EditParameterUseCase {
    parametersRepository;
    usersRepository;
    constructor(parametersRepository, usersRepository) {
        this.parametersRepository = parametersRepository;
        this.usersRepository = usersRepository;
    }
    async execute({ id, key, keyInfo, value, status, visible, updatedBy, }) {
        const parameter = await this.parametersRepository.findById(id);
        if (!parameter) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError({
                errorKey: 'parameter.find.notFound',
                key: String(id),
            }));
        }
        const user = await this.usersRepository.findById(updatedBy);
        if (!user) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError({
                errorKey: 'user.find.id.notFound',
            }));
        }
        if (parameter.key !== key) {
            const parameterAlreadyExists = await this.parametersRepository.findByKey(key);
            if (parameterAlreadyExists) {
                return (0, either_1.failure)(new resource_already_exists_error_1.ResourceAlreadyExistsError({
                    errorKey: 'parameter.create.alreadyExists',
                }));
            }
            parameter.key = key;
        }
        parameter.value = value;
        parameter.keyInfo = keyInfo;
        parameter.status = status;
        parameter.visible = visible;
        await this.parametersRepository.update(parameter);
        return (0, either_1.success)({
            parameter,
        });
    }
};
exports.EditParameterUseCase = EditParameterUseCase;
exports.EditParameterUseCase = EditParameterUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [parameters_repository_1.ParametersRepository,
        users_repository_1.UsersRepository])
], EditParameterUseCase);
//# sourceMappingURL=edit-parameter.js.map