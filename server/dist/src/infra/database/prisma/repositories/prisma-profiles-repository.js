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
exports.PrismaProfilesRepository = void 0;
const common_1 = require("@nestjs/common");
const build_search_filter_1 = require("../../../../core/util/filtering/build-search-filter");
const calc_pagination_1 = require("../../../../core/util/pagination/calc-pagination");
const prisma_service_1 = require("../prisma.service");
let PrismaProfilesRepository = class PrismaProfilesRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create({ name, status, visible, createdBy, }) {
        const profile = await this.prisma.profile.create({
            data: {
                name,
                status,
                visible,
                createdBy,
                updatedBy: createdBy,
            },
        });
        return profile;
    }
    async update({ id, name, status, visible, updatedBy, }) {
        const profile = await this.prisma.profile.update({
            where: {
                id,
            },
            data: {
                name: name ?? undefined,
                status: status ?? undefined,
                visible: visible ?? undefined,
                updatedBy,
            },
        });
        return profile;
    }
    async list(options, searchParams) {
        const { skip, take } = (0, calc_pagination_1.calcPagination)(options);
        const search = (0, build_search_filter_1.buildSearchFilter)(searchParams);
        const [profiles, count] = await this.prisma.$transaction([
            this.prisma.profile.findMany({
                where: search,
                skip,
                take,
                orderBy: { id: 'asc' },
            }),
            this.prisma.profile.count({ where: search }),
        ]);
        return { profiles, count };
    }
    async findById(id) {
        const profile = await this.prisma.profile.findUnique({
            where: {
                id,
            },
        });
        return profile;
    }
    async findByName(name) {
        const profile = await this.prisma.profile.findUnique({
            where: {
                name,
            },
        });
        return profile;
    }
};
exports.PrismaProfilesRepository = PrismaProfilesRepository;
exports.PrismaProfilesRepository = PrismaProfilesRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaProfilesRepository);
//# sourceMappingURL=prisma-profiles-repository.js.map