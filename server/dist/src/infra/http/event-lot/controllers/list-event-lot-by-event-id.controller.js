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
exports.ListEventLotByEventIdController = void 0;
const common_1 = require("@nestjs/common");
const params_schema_1 = require("../../../../core/schemas/params-schema");
const query_params_schema_1 = require("../../../../core/schemas/query-params-schema");
const list_event_lot_by_event_id_1 = require("../../../../domain/admsjp/use-cases/event-lot/list-event-lot-by-event-id");
const public_1 = require("../../../auth/public");
let ListEventLotByEventIdController = class ListEventLotByEventIdController {
    listEventLotByEventIdUseCase;
    constructor(listEventLotByEventIdUseCase) {
        this.listEventLotByEventIdUseCase = listEventLotByEventIdUseCase;
    }
    async handle(id, query, request) {
        const { page, pageSize, allRecords } = query;
        const { search } = request.cookies;
        const parsedSearch = search ? JSON.parse(search) : [];
        const parsedAllRecords = allRecords === 'true';
        const options = {
            page,
            pageSize,
            allRecords: parsedAllRecords,
        };
        const result = await this.listEventLotByEventIdUseCase.execute({
            eventId: id,
            options,
            searchParams: parsedSearch,
        });
        if (result.isError()) {
            throw new common_1.BadRequestException('Error fetching list of events');
        }
        const { eventLots, count } = result.value;
        return {
            eventLots,
            'x-total-count': count,
        };
    }
};
exports.ListEventLotByEventIdController = ListEventLotByEventIdController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('id', params_schema_1.paramsValidationPipe)),
    __param(1, (0, common_1.Query)(query_params_schema_1.queryValidationPipe)),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], ListEventLotByEventIdController.prototype, "handle", null);
exports.ListEventLotByEventIdController = ListEventLotByEventIdController = __decorate([
    (0, common_1.Controller)('/event/:id'),
    (0, public_1.Public)(),
    __metadata("design:paramtypes", [list_event_lot_by_event_id_1.ListEventLotByEventIdUseCase])
], ListEventLotByEventIdController);
//# sourceMappingURL=list-event-lot-by-event-id.controller.js.map