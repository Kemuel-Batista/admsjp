"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStatus = exports.UserProfile = void 0;
var UserProfile;
(function (UserProfile) {
    UserProfile[UserProfile["ADMINISTRADOR"] = 1] = "ADMINISTRADOR";
    UserProfile[UserProfile["ADMSJP_DIRETORIA"] = 2] = "ADMSJP_DIRETORIA";
    UserProfile[UserProfile["UMADSJP_DIRETORIA"] = 3] = "UMADSJP_DIRETORIA";
    UserProfile[UserProfile["UMADSJP_LEADERS"] = 4] = "UMADSJP_LEADERS";
    UserProfile[UserProfile["UMADSJP_DEPARTMENT_LEADERS"] = 5] = "UMADSJP_DEPARTMENT_LEADERS";
    UserProfile[UserProfile["EVENTS"] = 6] = "EVENTS";
})(UserProfile || (exports.UserProfile = UserProfile = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus[UserStatus["INACTIVE"] = 0] = "INACTIVE";
    UserStatus[UserStatus["ACTIVE"] = 1] = "ACTIVE";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
//# sourceMappingURL=user.js.map