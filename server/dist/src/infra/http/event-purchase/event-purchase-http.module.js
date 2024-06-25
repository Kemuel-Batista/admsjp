"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventPurchaseHttpModule = void 0;
const common_1 = require("@nestjs/common");
const cancel_event_purchase_by_expired_time_1 = require("../../../domain/admsjp/use-cases/event-purchase/cancel-event-purchase-by-expired-time");
const create_event_purchase_1 = require("../../../domain/admsjp/use-cases/event-purchase/create-event-purchase");
const list_event_purchases_by_user_id_1 = require("../../../domain/admsjp/use-cases/event-purchase/list-event-purchases-by-user-id");
const list_unexpired_event_purchases_with_details_by_user_id_1 = require("../../../domain/admsjp/use-cases/event-purchase/list-unexpired-event-purchases-with-details-by-user-id");
const database_module_1 = require("../../database/database.module");
const generators_module_1 = require("../../generators/generators.module");
const cancel_event_purchase_by_expired_time_controller_1 = require("./controllers/cancel-event-purchase-by-expired-time.controller");
const create_event_purchase_controller_1 = require("./controllers/create-event-purchase.controller");
const list_event_purchases_by_user_id_controller_1 = require("./controllers/list-event-purchases-by-user-id.controller");
const list_unexpired_event_purchases_with_details_by_user_id_controller_1 = require("./controllers/list-unexpired-event-purchases-with-details-by-user-id.controller");
let EventPurchaseHttpModule = class EventPurchaseHttpModule {
};
exports.EventPurchaseHttpModule = EventPurchaseHttpModule;
exports.EventPurchaseHttpModule = EventPurchaseHttpModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, generators_module_1.GeneratorsModule],
        controllers: [
            create_event_purchase_controller_1.CreateEventPurchaseController,
            list_unexpired_event_purchases_with_details_by_user_id_controller_1.ListUnexpiredEventPurchasesWithDetailsByUserIdController,
            list_event_purchases_by_user_id_controller_1.ListEventPurchasesByUserIdController,
            cancel_event_purchase_by_expired_time_controller_1.CancelEventPurchaseByExpiredTimeController,
        ],
        providers: [
            create_event_purchase_1.CreateEventPurchaseUseCase,
            list_unexpired_event_purchases_with_details_by_user_id_1.ListUnexpiredEventPurchasesWithDetailsByUserIdUseCase,
            list_event_purchases_by_user_id_1.ListEventPurchasesByUserIdUseCase,
            cancel_event_purchase_by_expired_time_1.CancelEventPurchaseByExpiredTimeUseCase,
        ],
    })
], EventPurchaseHttpModule);
//# sourceMappingURL=event-purchase-http.module.js.map