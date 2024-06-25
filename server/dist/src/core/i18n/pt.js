"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const department_pt_1 = require("../../domain/admsjp/languages/department.pt");
const event_pt_1 = require("../../domain/admsjp/languages/event.pt");
const event_address_pt_1 = require("../../domain/admsjp/languages/event-address.pt");
const event_lot_pt_1 = require("../../domain/admsjp/languages/event-lot.pt");
const event_purchase_pt_1 = require("../../domain/admsjp/languages/event-purchase.pt");
const event_ticket_pt_1 = require("../../domain/admsjp/languages/event-ticket.pt");
const order_pt_1 = require("../../domain/admsjp/languages/order.pt");
const parameter_pt_1 = require("../../domain/admsjp/languages/parameter.pt");
const profile_pt_1 = require("../../domain/admsjp/languages/profile.pt");
const profile_permission_pt_1 = require("../../domain/admsjp/languages/profile-permission.pt");
const user_pt_1 = require("../../domain/admsjp/languages/user.pt");
const messages = {
    pt: {
        translations: {
            ...department_pt_1.default,
            ...user_pt_1.default,
            ...profile_pt_1.default,
            ...profile_permission_pt_1.default,
            ...event_pt_1.default,
            ...event_address_pt_1.default,
            ...event_lot_pt_1.default,
            ...event_purchase_pt_1.default,
            ...event_ticket_pt_1.default,
            ...parameter_pt_1.default,
            ...order_pt_1.default,
        },
    },
};
exports.default = messages;
//# sourceMappingURL=pt.js.map