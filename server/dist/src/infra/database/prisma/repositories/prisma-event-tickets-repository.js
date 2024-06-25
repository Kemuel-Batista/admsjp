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
exports.PrismaEventTicketsRepository = void 0;
const common_1 = require("@nestjs/common");
const calc_pagination_1 = require("../../../../core/util/pagination/calc-pagination");
const prisma_service_1 = require("../prisma.service");
let PrismaEventTicketsRepository = class PrismaEventTicketsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create({ eventLotId, eventPurchaseId, qrCodeImage, qrCodeText, ticket, }) {
        const eventTicket = await this.prisma.eventTicket.create({
            data: {
                eventLotId,
                eventPurchaseId,
                qrCodeImage,
                qrCodeText,
                ticket,
            },
        });
        return eventTicket;
    }
    async save({ id, name, birthday, cpf, email, phone, }) {
        const event = await this.prisma.eventTicket.update({
            where: {
                id,
            },
            data: {
                name,
                birthday,
                cpf,
                email,
                phone,
            },
        });
        return event;
    }
    async findById(id) {
        const eventTicket = await this.prisma.eventTicket.findUnique({
            where: {
                id,
            },
        });
        return eventTicket;
    }
    async findDetailsById(id) {
        const eventTicket = await this.prisma.eventTicket.findUnique({
            where: {
                id,
            },
            include: {
                eventLot: {
                    select: {
                        name: true,
                        lot: true,
                        value: true,
                    },
                },
            },
        });
        return eventTicket;
    }
    async listByEventPurchaseId(eventPurchaseId, options) {
        const { skip, take } = (0, calc_pagination_1.calcPagination)(options);
        const eventTickets = await this.prisma.eventTicket.findMany({
            where: {
                eventPurchaseId,
            },
            skip,
            take,
            include: {
                eventLot: {
                    select: {
                        name: true,
                        lot: true,
                        value: true,
                    },
                },
            },
        });
        return eventTickets;
    }
    async listByEventLotId(eventLotId) {
        const eventTickets = await this.prisma.eventTicket.findMany({
            where: {
                eventLotId,
            },
        });
        return eventTickets;
    }
    async delete(id) {
        await this.prisma.eventTicket.delete({
            where: { id },
        });
    }
};
exports.PrismaEventTicketsRepository = PrismaEventTicketsRepository;
exports.PrismaEventTicketsRepository = PrismaEventTicketsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaEventTicketsRepository);
//# sourceMappingURL=prisma-event-tickets-repository.js.map