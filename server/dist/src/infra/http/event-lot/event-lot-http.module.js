"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventLotHttpModule = void 0;
const common_1 = require("@nestjs/common");
const edit_event_lot_1 = require("../../../domain/admsjp/use-cases/event-lot/edit-event-lot");
const list_event_lot_by_event_id_1 = require("../../../domain/admsjp/use-cases/event-lot/list-event-lot-by-event-id");
const database_module_1 = require("../../database/database.module");
const edit_event_lot_controller_1 = require("./controllers/edit-event-lot.controller");
const list_event_lot_by_event_id_controller_1 = require("./controllers/list-event-lot-by-event-id.controller");
let EventLotHttpModule = class EventLotHttpModule {
};
exports.EventLotHttpModule = EventLotHttpModule;
exports.EventLotHttpModule = EventLotHttpModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [list_event_lot_by_event_id_controller_1.ListEventLotByEventIdController, edit_event_lot_controller_1.EditEventLotController],
        providers: [list_event_lot_by_event_id_1.ListEventLotByEventIdUseCase, edit_event_lot_1.EditEventLotUseCase],
    })
], EventLotHttpModule);
//# sourceMappingURL=event-lot-http.module.js.map