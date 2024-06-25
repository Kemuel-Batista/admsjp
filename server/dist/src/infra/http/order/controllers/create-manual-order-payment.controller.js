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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateManualOrderPaymentController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const incorrect_association_error_1 = require("../../../../core/errors/errors/incorrect-association-error");
const invalid_attachment_type_error_1 = require("../../../../core/errors/errors/invalid-attachment-type-error");
const order_payment_already_completed_error_1 = require("../../../../core/errors/errors/order-payment-already-completed-error");
const resource_not_found_error_1 = require("../../../../core/errors/errors/resource-not-found-error");
const create_manual_order_payment_1 = require("../../../../domain/admsjp/use-cases/orders/create-manual-order-payment");
const current_user_decorator_1 = require("../../../auth/current-user-decorator");
let CreateManualOrderPaymentController = class CreateManualOrderPaymentController {
    createManualOrderPayment;
    constructor(createManualOrderPayment) {
        this.createManualOrderPayment = createManualOrderPayment;
    }
    async handle(file, transactionId, user) {
        const result = await this.createManualOrderPayment.execute({
            transactionId,
            fileName: file.originalname,
            fileType: file.mimetype,
            body: file.buffer,
            paidBy: user.sub.id,
        });
        if (result.isError()) {
            const error = result.value;
            switch (error.constructor) {
                case resource_not_found_error_1.ResourceNotFoundError:
                    throw new common_1.NotFoundException(error.message);
                case invalid_attachment_type_error_1.InvalidAttachmentTypeError:
                    throw new common_1.UnsupportedMediaTypeException(error.message);
                case incorrect_association_error_1.IncorrectAssociationError:
                    throw new common_1.PreconditionFailedException(error.message);
                case order_payment_already_completed_error_1.OrderPaymentAlreadyCompletedError:
                    throw new common_1.PreconditionFailedException(error.message);
                default:
                    throw new common_1.BadRequestException(error.message);
            }
        }
    }
};
exports.CreateManualOrderPaymentController = CreateManualOrderPaymentController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({
                maxSize: 1024 * 1024 * 5,
            }),
            new common_1.FileTypeValidator({ fileType: '.(png|jpg|jpeg|webp)' }),
        ],
    }))),
    __param(1, (0, common_1.Param)('transactionId')),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], CreateManualOrderPaymentController.prototype, "handle", null);
exports.CreateManualOrderPaymentController = CreateManualOrderPaymentController = __decorate([
    (0, common_1.Controller)('/manual/:transactionId'),
    __metadata("design:paramtypes", [create_manual_order_payment_1.CreateManualOrderPaymentUseCase])
], CreateManualOrderPaymentController);
//# sourceMappingURL=create-manual-order-payment.controller.js.map