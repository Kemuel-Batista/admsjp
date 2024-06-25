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
exports.ListEventsUseCase = void 0;
const common_1 = require("@nestjs/common");
const either_1 = require("../../../../core/either");
const user_1 = require("../../enums/user");
const events_repository_1 = require("../../repositories/events-repository");
let ListEventsUseCase = class ListEventsUseCase {
    eventsRepository;
    constructor(eventsRepository) {
        this.eventsRepository = eventsRepository;
    }
    async execute({ profileId, departmentId, options = {}, searchParams = [], }) {
        if (profileId !== user_1.UserProfile.ADMINISTRADOR) {
            searchParams.push({
                condition: 'equals',
                field: 'visible',
                value: 1,
            });
            searchParams.push({
                condition: 'equals',
                field: 'departmentId',
                value: departmentId,
            });
        }
        const { events, count } = await this.eventsRepository.list(options, searchParams);
        return (0, either_1.success)({
            events,
            count,
        });
    }
};
exports.ListEventsUseCase = ListEventsUseCase;
exports.ListEventsUseCase = ListEventsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [events_repository_1.EventsRepository])
], ListEventsUseCase);
//# sourceMappingURL=list-events.js.map