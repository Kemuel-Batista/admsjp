"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserStatusDescription = void 0;
const i18n_1 = require("../../../../core/i18n/i18n");
const user_1 = require("../../enums/user");
function getUserStatusDescription(status) {
    const keys = {
        [user_1.UserStatus.ACTIVE]: 'user.status.active',
        [user_1.UserStatus.INACTIVE]: 'user.status.inactive',
    };
    const key = keys[status];
    const statusDescription = key ? i18n_1.i18n.t(key) : null;
    return statusDescription;
}
exports.getUserStatusDescription = getUserStatusDescription;
//# sourceMappingURL=get-user-status-description.js.map