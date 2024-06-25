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
exports.PrismaParametersRepository = void 0;
const common_1 = require("@nestjs/common");
const build_search_filter_1 = require("../../../../core/util/filtering/build-search-filter");
const calc_pagination_1 = require("../../../../core/util/pagination/calc-pagination");
const prisma_service_1 = require("../prisma.service");
let PrismaParametersRepository = class PrismaParametersRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create({ key, keyInfo, value, status, visible, createdBy, }) {
        const parameter = await this.prisma.parameter.create({
            data: {
                key,
                keyInfo,
                value,
                status,
                visible,
                createdBy,
            },
        });
        return parameter;
    }
    async update({ id, key, keyInfo, value, status, visible, updatedBy, }) {
        const parameter = await this.prisma.parameter.update({
            where: {
                id,
            },
            data: {
                key: key ?? undefined,
                keyInfo: keyInfo ?? undefined,
                value: value ?? undefined,
                status: status ?? undefined,
                visible: visible ?? undefined,
                updatedBy,
            },
        });
        return parameter;
    }
    async list(options, searchParams) {
        const { skip, take } = (0, calc_pagination_1.calcPagination)(options);
        const search = (0, build_search_filter_1.buildSearchFilter)(searchParams);
        const [parameters, count] = await this.prisma.$transaction([
            this.prisma.parameter.findMany({
                where: search,
                skip,
                take,
                orderBy: { id: 'asc' },
            }),
            this.prisma.parameter.count({ where: search }),
        ]);
        return { parameters, count };
    }
    async findById(id) {
        const parameter = await this.prisma.parameter.findUnique({
            where: {
                id,
            },
        });
        return parameter;
    }
    async findByKey(key) {
        const parameter = await this.prisma.parameter.findUnique({
            where: {
                key,
            },
        });
        return parameter;
    }
};
exports.PrismaParametersRepository = PrismaParametersRepository;
exports.PrismaParametersRepository = PrismaParametersRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaParametersRepository);
//# sourceMappingURL=prisma-parameters-repository.js.map