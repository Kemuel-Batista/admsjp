"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventHttpModule = void 0;
const common_1 = require("@nestjs/common");
const create_event_address_1 = require("../../../domain/admsjp/use-cases/event-address/create-event-address");
const create_event_lot_1 = require("../../../domain/admsjp/use-cases/event-lot/create-event-lot");
const create_event_1 = require("../../../domain/admsjp/use-cases/events/create-event");
const delete_event_1 = require("../../../domain/admsjp/use-cases/events/delete-event");
const edit_event_1 = require("../../../domain/admsjp/use-cases/events/edit-event");
const get_event_by_id_1 = require("../../../domain/admsjp/use-cases/events/get-event-by-id");
const get_event_by_slug_1 = require("../../../domain/admsjp/use-cases/events/get-event-by-slug");
const list_events_1 = require("../../../domain/admsjp/use-cases/events/list-events");
const list_public_events_1 = require("../../../domain/admsjp/use-cases/events/list-public-events");
const database_module_1 = require("../../database/database.module");
const notifier_module_1 = require("../../notifier/notifier.module");
const storage_module_1 = require("../../storage/storage.module");
const create_event_controller_1 = require("./controllers/create-event.controller");
const delete_event_controller_1 = require("./controllers/delete-event.controller");
const edit_event_controller_1 = require("./controllers/edit-event.controller");
const get_event_by_id_controller_1 = require("./controllers/get-event-by-id.controller");
const get_event_by_slug_controller_1 = require("./controllers/get-event-by-slug.controller");
const list_events_controller_1 = require("./controllers/list-events.controller");
const list_public_events_controller_1 = require("./controllers/list-public-events.controller");
let EventHttpModule = class EventHttpModule {
};
exports.EventHttpModule = EventHttpModule;
exports.EventHttpModule = EventHttpModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, storage_module_1.StorageModule, notifier_module_1.NotifierModule],
        controllers: [
            create_event_controller_1.CreateEventController,
            list_events_controller_1.ListEventsController,
            list_public_events_controller_1.ListPublicEventsController,
            edit_event_controller_1.EditEventController,
            get_event_by_slug_controller_1.GetEventBySlugController,
            get_event_by_id_controller_1.GetEventByIdController,
            delete_event_controller_1.DeleteEventController,
        ],
        providers: [
            create_event_1.CreateEventUseCase,
            create_event_lot_1.CreateEventLotUseCase,
            create_event_address_1.CreateEventAddressUseCase,
            list_events_1.ListEventsUseCase,
            list_public_events_1.ListPublicEventsUseCase,
            edit_event_1.EditEventUseCase,
            get_event_by_slug_1.GetEventBySlugUseCase,
            get_event_by_id_1.GetEventByIdUseCase,
            delete_event_1.DeleteEventUseCase,
        ],
    })
], EventHttpModule);
//# sourceMappingURL=event-http.module.js.map