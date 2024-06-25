"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventLotVisible = exports.EventLotStatus = void 0;
var EventLotStatus;
(function (EventLotStatus) {
    EventLotStatus[EventLotStatus["INACTIVE"] = 0] = "INACTIVE";
    EventLotStatus[EventLotStatus["ACTIVE"] = 1] = "ACTIVE";
})(EventLotStatus || (exports.EventLotStatus = EventLotStatus = {}));
var EventLotVisible;
(function (EventLotVisible) {
    EventLotVisible[EventLotVisible["INVISIBLE"] = 0] = "INVISIBLE";
    EventLotVisible[EventLotVisible["VISIBLE"] = 1] = "VISIBLE";
})(EventLotVisible || (exports.EventLotVisible = EventLotVisible = {}));
//# sourceMappingURL=event-lot.js.map