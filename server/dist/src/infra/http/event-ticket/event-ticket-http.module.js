"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventTicketHttpModule = void 0;
const common_1 = require("@nestjs/common");
const complete_event_ticket_info_1 = require("../../../domain/admsjp/use-cases/event-ticket/complete-event-ticket-info");
const list_event_tickets_by_purchase_id_1 = require("../../../domain/admsjp/use-cases/event-ticket/list-event-tickets-by-purchase-id");
const database_module_1 = require("../../database/database.module");
const generators_module_1 = require("../../generators/generators.module");
const websocket_module_1 = require("../../websocket/websocket.module");
const complete_event_ticket_info_controller_1 = require("./controllers/complete-event-ticket-info.controller");
const list_event_tickets_by_purchase_id_controller_1 = require("./controllers/list-event-tickets-by-purchase-id.controller");
let EventTicketHttpModule = class EventTicketHttpModule {
};
exports.EventTicketHttpModule = EventTicketHttpModule;
exports.EventTicketHttpModule = EventTicketHttpModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, generators_module_1.GeneratorsModule, websocket_module_1.WebsocketModule],
        controllers: [
            list_event_tickets_by_purchase_id_controller_1.ListEventTicketsByPurchaseIdController,
            complete_event_ticket_info_controller_1.CompleteEventTicketInfoController,
        ],
        providers: [
            list_event_tickets_by_purchase_id_1.ListEventTicketsByPurchaseIdUseCase,
            complete_event_ticket_info_1.CompleteEventTicketInfoUseCase,
        ],
    })
], EventTicketHttpModule);
//# sourceMappingURL=event-ticket-http.module.js.map