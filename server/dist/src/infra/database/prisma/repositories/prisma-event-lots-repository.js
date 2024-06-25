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
exports.PrismaEventLotsRepository = void 0;
const common_1 = require("@nestjs/common");
const build_search_filter_1 = require("../../../../core/util/filtering/build-search-filter");
const calc_pagination_1 = require("../../../../core/util/pagination/calc-pagination");
const prisma_service_1 = require("../prisma.service");
let PrismaEventLotsRepository = class PrismaEventLotsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create({ name, description, eventId, quantity, lot, value, status, createdBy, }) {
        const eventLot = await this.prisma.eventLot.create({
            data: {
                name,
                description,
                eventId,
                quantity,
                lot,
                value,
                status,
                createdBy,
            },
        });
        return eventLot;
    }
    async save({ id, name, description, eventId, lot, quantity, fulfilledQuantity, updatedBy, }) {
        const event = await this.prisma.eventLot.update({
            where: {
                id,
            },
            data: {
                eventId: eventId ?? undefined,
                lot: lot ?? undefined,
                name: name ?? undefined,
                description: description ?? undefined,
                quantity: quantity ?? undefined,
                fulfilledQuantity: fulfilledQuantity ?? undefined,
                updatedBy,
            },
        });
        return event;
    }
    async list(options, searchParams) {
        const { skip, take } = (0, calc_pagination_1.calcPagination)(options);
        const search = (0, build_search_filter_1.buildSearchFilter)(searchParams);
        const [eventLots, count] = await this.prisma.$transaction([
            this.prisma.eventLot.findMany({
                where: search,
                skip,
                take,
                orderBy: { createdAt: 'asc' },
            }),
            this.prisma.eventLot.count({ where: search }),
        ]);
        return { eventLots, count };
    }
    async listByEventId(eventId, options, searchParams) {
        const { skip, take } = (0, calc_pagination_1.calcPagination)(options);
        searchParams.push({
            condition: 'equals',
            field: 'eventId',
            value: eventId,
        });
        const search = (0, build_search_filter_1.buildSearchFilter)(searchParams);
        let [eventLots, count] = await this.prisma.$transaction([
            this.prisma.eventLot.findMany({
                where: search,
                skip,
                take,
                orderBy: { createdAt: 'asc' },
            }),
            this.prisma.eventLot.count({ where: search }),
        ]);
        eventLots = eventLots.filter((item) => item.fulfilledQuantity <= item.quantity);
        return { eventLots, count };
    }
    async findById(id) {
        const eventLot = await this.prisma.eventLot.findUnique({
            where: {
                id,
            },
        });
        return eventLot;
    }
    async findMaxLotByEventId(eventId) {
        const eventLots = await this.prisma.eventLot.findMany({
            where: {
                eventId,
            },
        });
        if (eventLots.length === 0) {
            return null;
        }
        let maxEventLot = eventLots[0].lot;
        for (const eventLot of eventLots) {
            if (eventLot.lot > maxEventLot) {
                maxEventLot = eventLot.lot;
            }
        }
        return maxEventLot;
    }
};
exports.PrismaEventLotsRepository = PrismaEventLotsRepository;
exports.PrismaEventLotsRepository = PrismaEventLotsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaEventLotsRepository);
//# sourceMappingURL=prisma-event-lots-repository.js.map