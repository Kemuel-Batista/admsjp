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
exports.CreateManualOrderPaymentUseCase = void 0;
const common_1 = require("@nestjs/common");
const either_1 = require("../../../../core/either");
const incorrect_association_error_1 = require("../../../../core/errors/errors/incorrect-association-error");
const invalid_attachment_type_error_1 = require("../../../../core/errors/errors/invalid-attachment-type-error");
const order_payment_already_completed_error_1 = require("../../../../core/errors/errors/order-payment-already-completed-error");
const resource_not_found_error_1 = require("../../../../core/errors/errors/resource-not-found-error");
const event_purchase_1 = require("../../enums/event-purchase");
const order_1 = require("../../enums/order");
const event_purchases_repository_1 = require("../../repositories/event-purchases-repository");
const orders_repository_1 = require("../../repositories/orders-repository");
const uploader_1 = require("../../storage/uploader");
let CreateManualOrderPaymentUseCase = class CreateManualOrderPaymentUseCase {
    ordersRepository;
    eventPurchasesRepository;
    uploader;
    constructor(ordersRepository, eventPurchasesRepository, uploader) {
        this.ordersRepository = ordersRepository;
        this.eventPurchasesRepository = eventPurchasesRepository;
        this.uploader = uploader;
    }
    async execute({ transactionId, fileName, fileType, body, paidBy, }) {
        if (!/^(image\/(jpeg|png|webp))$|^application\/pdf$|^video\/mp4$/.test(fileType)) {
            return (0, either_1.failure)(new invalid_attachment_type_error_1.InvalidAttachmentTypeError({
                errorKey: 'order.create.invalidAttachmentType',
                key: fileType,
            }));
        }
        const eventPurchase = await this.eventPurchasesRepository.findById(transactionId);
        if (!eventPurchase) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError({
                errorKey: 'eventPurchase.find.notFound',
                key: transactionId.toString(),
            }));
        }
        if (eventPurchase.buyerId !== paidBy) {
            return (0, either_1.failure)(new incorrect_association_error_1.IncorrectAssociationError({
                errorKey: 'order.payment.ticketOwnerIsNotSame',
                key: paidBy.toString(),
            }));
        }
        if (eventPurchase.expiresAt === null) {
            return (0, either_1.failure)(new order_payment_already_completed_error_1.OrderPaymentAlreadyCompletedError({
                errorKey: 'order.payment.alreadyCompleted',
                key: transactionId.toString(),
            }));
        }
        const { url } = await this.uploader.upload({
            fileName,
            fileType,
            body,
        });
        await this.ordersRepository.create({
            transactionId,
            status: order_1.OrderStatus.WAITING_CONFIRMATION,
            paymentMethod: order_1.OrderPaymentMethod.MANUAL,
            attachment: url,
        });
        eventPurchase.expiresAt = null;
        eventPurchase.status = event_purchase_1.EventPurchaseStatus.WAITING_CONFIRMATION;
        await this.eventPurchasesRepository.save(eventPurchase);
        return (0, either_1.success)(null);
    }
};
exports.CreateManualOrderPaymentUseCase = CreateManualOrderPaymentUseCase;
exports.CreateManualOrderPaymentUseCase = CreateManualOrderPaymentUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [orders_repository_1.OrdersRepository,
        event_purchases_repository_1.EventPurchasesRepository,
        uploader_1.Uploader])
], CreateManualOrderPaymentUseCase);
//# sourceMappingURL=create-manual-order-payment.js.map