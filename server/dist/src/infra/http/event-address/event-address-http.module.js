"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventAddressHttpModule = void 0;
const common_1 = require("@nestjs/common");
const edit_event_address_1 = require("../../../domain/admsjp/use-cases/event-address/edit-event-address");
const get_event_address_by_event_id_1 = require("../../../domain/admsjp/use-cases/event-address/get-event-address-by-event-id");
const database_module_1 = require("../../database/database.module");
const get_event_address_by_event_id_controller_1 = require("./controllers/get-event-address-by-event-id.controller");
const update_event_address_controller_1 = require("./controllers/update-event-address.controller");
let EventAddressHttpModule = class EventAddressHttpModule {
};
exports.EventAddressHttpModule = EventAddressHttpModule;
exports.EventAddressHttpModule = EventAddressHttpModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [
            update_event_address_controller_1.UpdateEventAddressController,
            get_event_address_by_event_id_controller_1.GetEventAddressByEventIdController,
        ],
        providers: [edit_event_address_1.EditEventAddressUseCase, get_event_address_by_event_id_1.GetEventAddressByEventIdUseCase],
    })
], EventAddressHttpModule);
//# sourceMappingURL=event-address-http.module.js.map