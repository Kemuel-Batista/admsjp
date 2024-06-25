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
exports.PrismaEventAddressesRepository = void 0;
const common_1 = require("@nestjs/common");
const build_search_filter_1 = require("../../../../core/util/filtering/build-search-filter");
const calc_pagination_1 = require("../../../../core/util/pagination/calc-pagination");
const prisma_service_1 = require("../prisma.service");
let PrismaEventAddressesRepository = class PrismaEventAddressesRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create({ eventId, street, neighborhood, number, complement, state, city, latitude, longitude, createdBy, }) {
        const eventAddress = await this.prisma.eventAddress.create({
            data: {
                eventId,
                street,
                neighborhood,
                number,
                complement,
                state,
                city,
                latitude,
                longitude,
                createdBy,
            },
        });
        return eventAddress;
    }
    async update({ id, eventId, street, neighborhood, complement, state, city, latitude, longitude, updatedBy, }) {
        const event = await this.prisma.eventAddress.update({
            where: {
                id,
            },
            data: {
                eventId: eventId ?? undefined,
                street: street ?? undefined,
                neighborhood: neighborhood ?? undefined,
                complement: complement ?? undefined,
                state: state ?? undefined,
                city: city ?? undefined,
                latitude: latitude ?? undefined,
                longitude: longitude ?? undefined,
                updatedBy,
            },
        });
        return event;
    }
    async list(options, searchParams) {
        const { skip, take } = (0, calc_pagination_1.calcPagination)(options);
        const search = (0, build_search_filter_1.buildSearchFilter)(searchParams);
        const [eventAddresses, count] = await this.prisma.$transaction([
            this.prisma.eventAddress.findMany({
                where: search,
                skip,
                take,
                orderBy: { id: 'asc' },
            }),
            this.prisma.eventAddress.count({ where: search }),
        ]);
        return { eventAddresses, count };
    }
    async findById(id) {
        const eventAddress = await this.prisma.eventAddress.findUnique({
            where: {
                id,
            },
        });
        return eventAddress;
    }
    async findByEventId(eventId) {
        const eventAddress = await this.prisma.eventAddress.findUnique({
            where: {
                eventId,
            },
        });
        return eventAddress;
    }
};
exports.PrismaEventAddressesRepository = PrismaEventAddressesRepository;
exports.PrismaEventAddressesRepository = PrismaEventAddressesRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaEventAddressesRepository);
//# sourceMappingURL=prisma-event-addresses-repository.js.map