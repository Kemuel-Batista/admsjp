"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventPurchaseStatus = void 0;
var EventPurchaseStatus;
(function (EventPurchaseStatus) {
    EventPurchaseStatus[EventPurchaseStatus["NEW"] = 0] = "NEW";
    EventPurchaseStatus[EventPurchaseStatus["WAITING_CONFIRMATION"] = 1] = "WAITING_CONFIRMATION";
    EventPurchaseStatus[EventPurchaseStatus["CONFIRMED"] = 10] = "CONFIRMED";
    EventPurchaseStatus[EventPurchaseStatus["CANCELED"] = 90] = "CANCELED";
    EventPurchaseStatus[EventPurchaseStatus["REFUNDED"] = 91] = "REFUNDED";
})(EventPurchaseStatus || (exports.EventPurchaseStatus = EventPurchaseStatus = {}));
//# sourceMappingURL=event-purchase.js.map