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
exports.ListUnexpiredEventPurchasesWithDetailsByUserIdController = void 0;
const common_1 = require("@nestjs/common");
const list_unexpired_event_purchases_with_details_by_user_id_1 = require("../../../../domain/admsjp/use-cases/event-purchase/list-unexpired-event-purchases-with-details-by-user-id");
const current_user_decorator_1 = require("../../../auth/current-user-decorator");
let ListUnexpiredEventPurchasesWithDetailsByUserIdController = class ListUnexpiredEventPurchasesWithDetailsByUserIdController {
    listUnexpiredEventPurchasesWithDetailsByUserIdUseCase;
    constructor(listUnexpiredEventPurchasesWithDetailsByUserIdUseCase) {
        this.listUnexpiredEventPurchasesWithDetailsByUserIdUseCase = listUnexpiredEventPurchasesWithDetailsByUserIdUseCase;
    }
    async handle(user) {
        const result = await this.listUnexpiredEventPurchasesWithDetailsByUserIdUseCase.execute({
            buyerId: user.sub.id,
        });
        if (result.isError()) {
            throw new common_1.BadRequestException();
        }
        const eventPurchases = result.value.eventPurchases;
        return {
            eventPurchases,
        };
    }
};
exports.ListUnexpiredEventPurchasesWithDetailsByUserIdController = ListUnexpiredEventPurchasesWithDetailsByUserIdController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ListUnexpiredEventPurchasesWithDetailsByUserIdController.prototype, "handle", null);
exports.ListUnexpiredEventPurchasesWithDetailsByUserIdController = ListUnexpiredEventPurchasesWithDetailsByUserIdController = __decorate([
    (0, common_1.Controller)('/unexpired'),
    __metadata("design:paramtypes", [list_unexpired_event_purchases_with_details_by_user_id_1.ListUnexpiredEventPurchasesWithDetailsByUserIdUseCase])
], ListUnexpiredEventPurchasesWithDetailsByUserIdController);
//# sourceMappingURL=list-unexpired-event-purchases-with-details-by-user-id.controller.js.map