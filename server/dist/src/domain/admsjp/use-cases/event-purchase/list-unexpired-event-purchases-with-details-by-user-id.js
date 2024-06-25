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
exports.ListUnexpiredEventPurchasesWithDetailsByUserIdUseCase = void 0;
const common_1 = require("@nestjs/common");
const either_1 = require("../../../../core/either");
const resource_not_found_error_1 = require("../../../../core/errors/errors/resource-not-found-error");
const event_purchases_repository_1 = require("../../repositories/event-purchases-repository");
const users_repository_1 = require("../../repositories/users-repository");
let ListUnexpiredEventPurchasesWithDetailsByUserIdUseCase = class ListUnexpiredEventPurchasesWithDetailsByUserIdUseCase {
    eventPurchasesRepository;
    usersRepository;
    constructor(eventPurchasesRepository, usersRepository) {
        this.eventPurchasesRepository = eventPurchasesRepository;
        this.usersRepository = usersRepository;
    }
    async execute({ buyerId, }) {
        const user = await this.usersRepository.findById(buyerId);
        if (!user) {
            return (0, either_1.failure)(new resource_not_found_error_1.ResourceNotFoundError({
                errorKey: 'user.find.id.notFound',
            }));
        }
        const eventPurchases = await this.eventPurchasesRepository.listUnexpiredByUserId(buyerId);
        return (0, either_1.success)({
            eventPurchases,
        });
    }
};
exports.ListUnexpiredEventPurchasesWithDetailsByUserIdUseCase = ListUnexpiredEventPurchasesWithDetailsByUserIdUseCase;
exports.ListUnexpiredEventPurchasesWithDetailsByUserIdUseCase = ListUnexpiredEventPurchasesWithDetailsByUserIdUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_purchases_repository_1.EventPurchasesRepository,
        users_repository_1.UsersRepository])
], ListUnexpiredEventPurchasesWithDetailsByUserIdUseCase);
//# sourceMappingURL=list-unexpired-event-purchases-with-details-by-user-id.js.map