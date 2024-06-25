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
exports.GetEventBySlugController = void 0;
const common_1 = require("@nestjs/common");
const get_event_by_slug_1 = require("../../../../domain/admsjp/use-cases/events/get-event-by-slug");
const public_1 = require("../../../auth/public");
let GetEventBySlugController = class GetEventBySlugController {
    getEventBySlug;
    constructor(getEventBySlug) {
        this.getEventBySlug = getEventBySlug;
    }
    async handle(slug) {
        const result = await this.getEventBySlug.execute({
            slug,
        });
        if (result.isError()) {
            throw new common_1.BadRequestException();
        }
        return {
            event: result.value.event,
        };
    }
};
exports.GetEventBySlugController = GetEventBySlugController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GetEventBySlugController.prototype, "handle", null);
exports.GetEventBySlugController = GetEventBySlugController = __decorate([
    (0, common_1.Controller)('/slug/:slug'),
    (0, public_1.Public)(),
    __metadata("design:paramtypes", [get_event_by_slug_1.GetEventBySlugUseCase])
], GetEventBySlugController);
//# sourceMappingURL=get-event-by-slug.controller.js.map