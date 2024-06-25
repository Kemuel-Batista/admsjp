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
exports.RegisterUserUseCase = void 0;
const common_1 = require("@nestjs/common");
const either_1 = require("../../../../core/either");
const resource_already_exists_error_1 = require("../../../../core/errors/errors/resource-already-exists-error");
const resource_not_found_error_1 = require("../../../../core/errors/errors/resource-not-found-error");
const hash_generator_1 = require("../../cryptography/hash-generator");
const user_1 = require("../../enums/user");
const departments_repository_1 = require("../../repositories/departments-repository");
const profiles_repository_1 = require("../../repositories/profiles-repository");
const users_repository_1 = require("../../repositories/users-repository");
let RegisterUserUseCase = class RegisterUserUseCase {
    usersRepository;
    departmentsRepository;
    profilesRepository;
    hashGenerator;
    constructor(usersRepository, departmentsRepository, profilesRepository, hashGenerator) {
        this.usersRepository = usersRepository;
        this.departmentsRepository = departmentsRepository;
        this.profilesRepository = profilesRepository;
        this.hashGenerator = hashGenerator;
    }
    async execute({ email, name, password, status = user_1.UserStatus.ACTIVE, photo, departmentId, profileId, provider, }) {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);
        if (userAlreadyExists) {
            return (0, either_1.failure)(new resource_already_exists_error_1.ResourceAlreadyExistsError({
                errorKey: 'user.create.alreadyExists',
                key: email,
            }));
        }
        const department = await this.departmentsRepository.findById(departmentId);
        if (!department) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError({
                errorKey: 'department.find.notFound',
                key: String(departmentId),
            }));
        }
        const profile = await this.profilesRepository.findById(profileId);
        if (!profile) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError({
                errorKey: 'profile.find.notFound',
                key: String(profileId),
            }));
        }
        const hashedPassword = await this.hashGenerator.hash(password);
        await this.usersRepository.create({
            email,
            name,
            password: hashedPassword,
            photo,
            status,
            departmentId,
            profileId,
            createdBy: 1,
            provider,
        });
    }
};
exports.RegisterUserUseCase = RegisterUserUseCase;
exports.RegisterUserUseCase = RegisterUserUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        departments_repository_1.DepartmentsRepository,
        profiles_repository_1.ProfilesRepository,
        hash_generator_1.HashGenerator])
], RegisterUserUseCase);
//# sourceMappingURL=register-user.js.map