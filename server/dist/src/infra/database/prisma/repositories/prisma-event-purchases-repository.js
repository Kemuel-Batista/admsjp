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
exports.PrismaEventPurchasesRepository = void 0;
const common_1 = require("@nestjs/common");
const calc_pagination_1 = require("../../../../core/util/pagination/calc-pagination");
const prisma_service_1 = require("../prisma.service");
let PrismaEventPurchasesRepository = class PrismaEventPurchasesRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create({ buyerId, eventId, expiresAt, invoiceNumber, status, }) {
        const eventPurchase = await this.prisma.eventPurchase.create({
            data: {
                buyerId,
                eventId,
                expiresAt,
                invoiceNumber,
                status,
            },
        });
        return eventPurchase;
    }
    async save({ id, expiresAt, status }) {
        const eventPurchase = await this.prisma.eventPurchase.update({
            where: {
                id,
            },
            data: {
                expiresAt,
                status: status ?? undefined,
                updatedAt: new Date(),
            },
        });
        return eventPurchase;
    }
    async findById(id) {
        const eventPurchase = await this.prisma.eventPurchase.findUnique({
            where: {
                id,
            },
        });
        return eventPurchase;
    }
    async lastInvoiceNumber() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const eventPurchases = await this.prisma.eventPurchase.findMany();
        const relevantInvoiceNumbers = eventPurchases
            .filter((item) => {
            const itemYear = item.createdAt.getFullYear();
            const itemMonth = item.createdAt.getMonth() + 1;
            const itemDay = item.createdAt.getDate();
            return itemYear === year && itemMonth === month && itemDay === day;
        })
            .map((item) => item.invoiceNumber);
        if (relevantInvoiceNumbers.length === 0) {
            return '';
        }
        const maxInvoiceNumber = relevantInvoiceNumbers.reduce((max, invoiceNumber) => {
            const invoiceNumberCount = parseInt(invoiceNumber.substring(12), 10);
            return Math.max(max, invoiceNumberCount);
        }, 0);
        return `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}EV${maxInvoiceNumber.toString().padStart(4, '0')}`;
    }
    async list(options) {
        const { skip, take } = (0, calc_pagination_1.calcPagination)(options);
        const eventPurchases = await this.prisma.eventPurchase.findMany({
            where: {
                deletedAt: null,
            },
            skip,
            take,
        });
        return eventPurchases;
    }
    async listByBuyerId(buyerId, options) {
        const { skip, take } = (0, calc_pagination_1.calcPagination)(options);
        const eventPurchases = await this.prisma.eventPurchase.findMany({
            where: {
                deletedAt: null,
                buyerId,
            },
            skip,
            take,
            include: {
                event: {
                    select: {
                        title: true,
                        slug: true,
                        initialDate: true,
                        finalDate: true,
                        imagePath: true,
                    },
                },
            },
        });
        return eventPurchases;
    }
    async listUnexpiredByUserId(buyerId) {
        const now = new Date();
        const eventPurchases = await this.prisma.eventPurchase.findMany({
            where: {
                buyerId,
                expiresAt: {
                    gte: new Date(now.getTime() - 15 * 60 * 1000),
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                eventTickets: true,
            },
        });
        return eventPurchases;
    }
    async listBuyerDetailsByEventId(eventId) {
        const eventPurchases = await this.prisma.eventPurchase.findMany({
            where: {
                eventId,
            },
            include: {
                user: {
                    select: {
                        email: true,
                        name: true,
                    },
                },
            },
        });
        return eventPurchases;
    }
    async listCloseToExpiry() {
        const eventPurchases = await this.prisma.eventPurchase.findMany({
            where: {
                expiresAt: {
                    not: null,
                },
            },
        });
        return eventPurchases;
    }
    async delete(id) {
        await this.prisma.eventPurchase.delete({
            where: { id },
        });
    }
};
exports.PrismaEventPurchasesRepository = PrismaEventPurchasesRepository;
exports.PrismaEventPurchasesRepository = PrismaEventPurchasesRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaEventPurchasesRepository);
//# sourceMappingURL=prisma-event-purchases-repository.js.map