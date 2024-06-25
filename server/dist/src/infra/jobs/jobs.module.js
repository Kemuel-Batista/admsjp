"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsModule = void 0;
const common_1 = require("@nestjs/common");
const clear_expired_purchases_job_1 = require("../../domain/admsjp/jobs/event-purchase/clear-expired-purchases-job");
const database_module_1 = require("../database/database.module");
const clear_expired_tickets_job_service_1 = require("./event-purchase/clear-expired-tickets-job-service");
let JobsModule = class JobsModule {
};
exports.JobsModule = JobsModule;
exports.JobsModule = JobsModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        providers: [clear_expired_purchases_job_1.ClearExpiredPurchasesJob, clear_expired_tickets_job_service_1.ClearExpiredPurchasesJobService],
    })
], JobsModule);
//# sourceMappingURL=jobs.module.js.map