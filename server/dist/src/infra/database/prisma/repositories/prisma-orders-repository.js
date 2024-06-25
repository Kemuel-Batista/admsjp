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
exports.PrismaOrdersRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let PrismaOrdersRepository = class PrismaOrdersRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create({ transactionId, transactionType, paidAt, pixQrCode, attachment, status, paymentMethod, }) {
        const order = await this.prisma.order.create({
            data: {
                transactionId,
                transactionType,
                paidAt,
                pixQrCode,
                attachment,
                status,
                paymentMethod,
            },
        });
        return order;
    }
    async update({ id, status, confirmedBy, paidAt }) {
        const order = await this.prisma.order.update({
            where: {
                id,
            },
            data: {
                status,
                confirmedBy,
                paidAt,
                updatedAt: new Date(),
            },
        });
        return order;
    }
    async findById(id) {
        const order = await this.prisma.order.findUnique({
            where: {
                id,
            },
        });
        return order;
    }
    async listByTransactionId(transactionId) {
        const orders = await this.prisma.order.findMany({
            where: {
                transactionId,
            },
        });
        return orders;
    }
};
exports.PrismaOrdersRepository = PrismaOrdersRepository;
exports.PrismaOrdersRepository = PrismaOrdersRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaOrdersRepository);
//# sourceMappingURL=prisma-orders-repository.js.map