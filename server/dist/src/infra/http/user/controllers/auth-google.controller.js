"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGoogleController = void 0;
const common_1 = require("@nestjs/common");
const google_oauth_guard_1 = require("../../../auth/google-oauth.guard");
const public_1 = require("../../../auth/public");
let AuthGoogleController = class AuthGoogleController {
    constructor() { }
    async handle() { }
};
exports.AuthGoogleController = AuthGoogleController;
__decorate([
    (0, common_1.Get)('google'),
    (0, common_1.UseGuards)(google_oauth_guard_1.GoogleOAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthGoogleController.prototype, "handle", null);
exports.AuthGoogleController = AuthGoogleController = __decorate([
    (0, common_1.Controller)(),
    (0, public_1.Public)(),
    __metadata("design:paramtypes", [])
], AuthGoogleController);
//# sourceMappingURL=auth-google.controller.js.map