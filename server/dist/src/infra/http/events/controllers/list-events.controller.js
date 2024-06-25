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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListEventsController = void 0;
const common_1 = require("@nestjs/common");
const user_1 = require("../../../../domain/admsjp/enums/user");
const list_events_1 = require("../../../../domain/admsjp/use-cases/events/list-events");
const current_user_decorator_1 = require("../../../auth/current-user-decorator");
const profile_guard_1 = require("../../../auth/profile.guard");
const profiles_1 = require("../../../auth/profiles");
let ListEventsController = class ListEventsController {
    listEventsUseCase;
    constructor(listEventsUseCase) {
        this.listEventsUseCase = listEventsUseCase;
    }
    async handle(user) {
        const result = await this.listEventsUseCase.execute({
            profileId: user.sub.profileId,
            departmentId: user.sub.departmentId,
        });
        if (result.isError()) {
            throw new common_1.BadRequestException('Error fetching list of events');
        }
        const { events, count } = result.value;
        return {
            events,
            'x-total-count': count,
        };
    }
};
exports.ListEventsController = ListEventsController;
__decorate([
    (0, profiles_1.Profiles)(user_1.UserProfile.ADMINISTRADOR, user_1.UserProfile.EVENTS),
    (0, common_1.UseGuards)(profile_guard_1.ProfileGuard),
    (0, common_1.Get)(),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ListEventsController.prototype, "handle", null);
exports.ListEventsController = ListEventsController = __decorate([
    (0, common_1.Controller)('/'),
    __metadata("design:paramtypes", [list_events_1.ListEventsUseCase])
], ListEventsController);
//# sourceMappingURL=list-events.controller.js.map