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
exports.ListEventTicketsByPurchaseIdController = void 0;
const common_1 = require("@nestjs/common");
const list_event_tickets_by_purchase_id_1 = require("../../../../domain/admsjp/use-cases/event-ticket/list-event-tickets-by-purchase-id");
let ListEventTicketsByPurchaseIdController = class ListEventTicketsByPurchaseIdController {
    listEventTicketsByPurchaseIdUseCase;
    constructor(listEventTicketsByPurchaseIdUseCase) {
        this.listEventTicketsByPurchaseIdUseCase = listEventTicketsByPurchaseIdUseCase;
    }
    async handle(purchaseId) {
        const result = await this.listEventTicketsByPurchaseIdUseCase.execute({
            purchaseId,
        });
        if (result.isError()) {
            throw new common_1.BadRequestException();
        }
        const eventTickets = result.value.eventTickets;
        return {
            eventTickets,
        };
    }
};
exports.ListEventTicketsByPurchaseIdController = ListEventTicketsByPurchaseIdController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('purchaseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ListEventTicketsByPurchaseIdController.prototype, "handle", null);
exports.ListEventTicketsByPurchaseIdController = ListEventTicketsByPurchaseIdController = __decorate([
    (0, common_1.Controller)('/purchase/:purchaseId'),
    __metadata("design:paramtypes", [list_event_tickets_by_purchase_id_1.ListEventTicketsByPurchaseIdUseCase])
], ListEventTicketsByPurchaseIdController);
//# sourceMappingURL=list-event-tickets-by-purchase-id.controller.js.map