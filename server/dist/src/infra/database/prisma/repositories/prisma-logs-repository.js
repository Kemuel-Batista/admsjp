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
exports.PrismaLogsRepository = void 0;
const common_1 = require("@nestjs/common");
const build_search_filter_1 = require("../../../../core/util/filtering/build-search-filter");
const calc_pagination_1 = require("../../../../core/util/pagination/calc-pagination");
const prisma_service_1 = require("../prisma.service");
let PrismaLogsRepository = class PrismaLogsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async log(data) {
        await this.prisma.log.create({
            data: {
                process: data.process,
                value: data.value,
                oldValue: data.oldValue,
                level: data.level,
                userId: data.userId,
                note: data.note,
                jsonRequest: data.jsonRequest,
                jsonResponse: data.jsonResponse,
            },
        });
    }
    async listByDate(level, dateInitial, dateFinal, options, searchParams) {
        const { skip, take } = (0, calc_pagination_1.calcPagination)(options);
        searchParams.push({
            field: 'level',
            condition: 'equals',
            value: level,
        });
        searchParams.push({
            field: 'timestamp',
            condition: 'lte',
            value: dateFinal,
        });
        searchParams.push({
            field: 'timestamp',
            condition: 'gte',
            value: dateInitial,
        });
        const search = (0, build_search_filter_1.buildSearchFilter)(searchParams);
        const [logs, count] = await this.prisma.$transaction([
            this.prisma.log.findMany({
                where: search,
                skip,
                take,
                orderBy: { id: 'desc' },
            }),
            this.prisma.log.count({
                where: search,
            }),
        ]);
        return { logs, count };
    }
};
exports.PrismaLogsRepository = PrismaLogsRepository;
exports.PrismaLogsRepository = PrismaLogsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaLogsRepository);
//# sourceMappingURL=prisma-logs-repository.js.map