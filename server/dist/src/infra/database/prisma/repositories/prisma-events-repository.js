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
exports.PrismaEventsRepository = void 0;
const common_1 = require("@nestjs/common");
const build_search_filter_1 = require("../../../../core/util/filtering/build-search-filter");
const calc_pagination_1 = require("../../../../core/util/pagination/calc-pagination");
const prisma_service_1 = require("../prisma.service");
let PrismaEventsRepository = class PrismaEventsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create({ title, slug, description, initialDate, finalDate, status, visible, departmentId, eventType, imagePath, message, pixKey, pixType, createdBy, }) {
        const event = await this.prisma.event.create({
            data: {
                title,
                slug,
                description,
                initialDate,
                finalDate,
                status,
                visible,
                departmentId,
                eventType,
                imagePath,
                message,
                pixKey,
                pixType,
                createdBy,
                updatedBy: createdBy,
            },
        });
        return event;
    }
    async update({ id, title, slug, description, initialDate, finalDate, status, visible, eventType, imagePath, message, pixKey, pixType, updatedBy, }) {
        const event = await this.prisma.event.update({
            where: {
                id,
            },
            data: {
                title: title ?? undefined,
                slug: slug ?? undefined,
                description: description ?? undefined,
                initialDate: initialDate ?? undefined,
                finalDate: finalDate ?? undefined,
                status: status ?? undefined,
                visible: visible ?? undefined,
                eventType: eventType ?? undefined,
                imagePath: imagePath ?? undefined,
                message: message ?? undefined,
                pixKey: pixKey ?? undefined,
                pixType: pixType ?? undefined,
                updatedBy,
            },
        });
        return event;
    }
    async list(options, searchParams) {
        const { skip, take } = (0, calc_pagination_1.calcPagination)(options);
        const search = (0, build_search_filter_1.buildSearchFilter)(searchParams);
        const [events, count] = await this.prisma.$transaction([
            this.prisma.event.findMany({
                where: search,
                skip,
                take,
                orderBy: { id: 'asc' },
            }),
            this.prisma.event.count({ where: search }),
        ]);
        return { events, count };
    }
    async findById(id) {
        const event = await this.prisma.event.findUnique({
            where: {
                id,
            },
        });
        return event;
    }
    async findByTitle(title) {
        const event = await this.prisma.event.findUnique({
            where: {
                title,
            },
        });
        return event;
    }
    async findBySlug(slug) {
        const event = await this.prisma.event.findUnique({
            where: {
                slug,
            },
        });
        return event;
    }
    async delete(id) {
        await this.prisma.profilePermission.delete({
            where: { id },
        });
    }
};
exports.PrismaEventsRepository = PrismaEventsRepository;
exports.PrismaEventsRepository = PrismaEventsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaEventsRepository);
//# sourceMappingURL=prisma-events-repository.js.map