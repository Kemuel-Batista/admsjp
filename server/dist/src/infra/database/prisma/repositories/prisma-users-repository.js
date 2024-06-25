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
exports.PrismaUsersRepository = void 0;
const common_1 = require("@nestjs/common");
const build_search_filter_1 = require("../../../../core/util/filtering/build-search-filter");
const calc_pagination_1 = require("../../../../core/util/pagination/calc-pagination");
const prisma_service_1 = require("../prisma.service");
let PrismaUsersRepository = class PrismaUsersRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create({ email, name, password, photo, status, departmentId, profileId, provider, createdBy, }) {
        const user = await this.prisma.user.create({
            data: {
                email,
                name,
                password,
                photo,
                status,
                departmentId,
                profileId,
                provider,
                createdBy,
                updatedBy: createdBy,
            },
        });
        return user;
    }
    async update({ id, email, name, password, status, departmentId, profileId, updatedBy, }) {
        const user = await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                email: email ?? undefined,
                name: name ?? undefined,
                password: password ?? undefined,
                status: status ?? undefined,
                departmentId: departmentId ?? undefined,
                profileId: profileId ?? undefined,
                updatedBy,
            },
        });
        return user;
    }
    async list(options, searchParams = []) {
        const { skip, take } = (0, calc_pagination_1.calcPagination)(options);
        const search = (0, build_search_filter_1.buildSearchFilter)(searchParams);
        const [users, count] = await this.prisma.$transaction([
            this.prisma.user.findMany({
                where: search,
                select: {
                    id: true,
                    uuid: true,
                    name: true,
                    email: true,
                    password: false,
                    status: true,
                    photo: true,
                    provider: true,
                    departmentId: true,
                    profileId: true,
                    createdAt: true,
                    updatedAt: true,
                    createdBy: true,
                    updatedBy: true,
                    deletedAt: true,
                    deletedBy: true,
                },
                skip,
                take,
                orderBy: { id: 'asc' },
            }),
            this.prisma.user.count({ where: search }),
        ]);
        return { users, count };
    }
    async findById(id) {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
        return user;
    }
    async findByEmail(email) {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
        return user;
    }
    async delete(userId) {
        await this.prisma.user.delete({
            where: {
                id: userId,
            },
        });
    }
};
exports.PrismaUsersRepository = PrismaUsersRepository;
exports.PrismaUsersRepository = PrismaUsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaUsersRepository);
//# sourceMappingURL=prisma-users-repository.js.map