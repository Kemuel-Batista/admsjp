"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventPixType = exports.EventVisible = exports.EventStatus = exports.EventType = void 0;
var EventType;
(function (EventType) {
    EventType[EventType["REMOTO"] = 0] = "REMOTO";
    EventType[EventType["PRESENCIAL"] = 10] = "PRESENCIAL";
    EventType[EventType["HIBRIDO"] = 20] = "HIBRIDO";
})(EventType || (exports.EventType = EventType = {}));
var EventStatus;
(function (EventStatus) {
    EventStatus[EventStatus["INACTIVE"] = 0] = "INACTIVE";
    EventStatus[EventStatus["ACTIVE"] = 1] = "ACTIVE";
})(EventStatus || (exports.EventStatus = EventStatus = {}));
var EventVisible;
(function (EventVisible) {
    EventVisible[EventVisible["INVISIBLE"] = 0] = "INVISIBLE";
    EventVisible[EventVisible["VISIBLE"] = 1] = "VISIBLE";
})(EventVisible || (exports.EventVisible = EventVisible = {}));
var EventPixType;
(function (EventPixType) {
    EventPixType[EventPixType["CPF"] = 1] = "CPF";
    EventPixType[EventPixType["EMAIL"] = 2] = "EMAIL";
    EventPixType[EventPixType["PHONE"] = 3] = "PHONE";
    EventPixType[EventPixType["CHAVE"] = 4] = "CHAVE";
})(EventPixType || (exports.EventPixType = EventPixType = {}));
//# sourceMappingURL=event.js.map