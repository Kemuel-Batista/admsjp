"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfileDescription = void 0;
const i18n_1 = require("../../../../core/i18n/i18n");
const user_1 = require("../../enums/user");
function getUserProfileDescription(profileId) {
    const keys = {
        [user_1.UserProfile.ADMINISTRADOR]: 'user.profile.administrator',
        [user_1.UserProfile.ADMSJP_DIRETORIA]: 'user.profile.admsjp_diretoria',
    };
    const key = keys[profileId];
    const statusDescription = key ? i18n_1.i18n.t(key) : null;
    return statusDescription;
}
exports.getUserProfileDescription = getUserProfileDescription;
//# sourceMappingURL=get-user-profile-description.js.map