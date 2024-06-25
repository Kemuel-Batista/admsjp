"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const departments_repository_1 = require("../../domain/admsjp/repositories/departments-repository");
const event_addresses_repository_1 = require("../../domain/admsjp/repositories/event-addresses-repository");
const event_lots_repository_1 = require("../../domain/admsjp/repositories/event-lots-repository");
const event_purchases_repository_1 = require("../../domain/admsjp/repositories/event-purchases-repository");
const event_tickets_repository_1 = require("../../domain/admsjp/repositories/event-tickets-repository");
const events_repository_1 = require("../../domain/admsjp/repositories/events-repository");
const logs_repository_1 = require("../../domain/admsjp/repositories/logs-repository");
const orders_repository_1 = require("../../domain/admsjp/repositories/orders-repository");
const parameters_repository_1 = require("../../domain/admsjp/repositories/parameters-repository");
const profile_permissions_repository_1 = require("../../domain/admsjp/repositories/profile-permissions-repository");
const profiles_repository_1 = require("../../domain/admsjp/repositories/profiles-repository");
const users_repository_1 = require("../../domain/admsjp/repositories/users-repository");
const prisma_service_1 = require("./prisma/prisma.service");
const prisma_departments_repository_1 = require("./prisma/repositories/prisma-departments-repository");
const prisma_event_addresses_repository_1 = require("./prisma/repositories/prisma-event-addresses-repository");
const prisma_event_lots_repository_1 = require("./prisma/repositories/prisma-event-lots-repository");
const prisma_event_purchases_repository_1 = require("./prisma/repositories/prisma-event-purchases-repository");
const prisma_event_tickets_repository_1 = require("./prisma/repositories/prisma-event-tickets-repository");
const prisma_events_repository_1 = require("./prisma/repositories/prisma-events-repository");
const prisma_logs_repository_1 = require("./prisma/repositories/prisma-logs-repository");
const prisma_orders_repository_1 = require("./prisma/repositories/prisma-orders-repository");
const prisma_parameters_repository_1 = require("./prisma/repositories/prisma-parameters-repository");
const prisma_profile_permissions_repository_1 = require("./prisma/repositories/prisma-profile-permissions-repository");
const prisma_profiles_repository_1 = require("./prisma/repositories/prisma-profiles-repository");
const prisma_users_repository_1 = require("./prisma/repositories/prisma-users-repository");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        providers: [
            prisma_service_1.PrismaService,
            {
                provide: logs_repository_1.LogsRepository,
                useClass: prisma_logs_repository_1.PrismaLogsRepository,
            },
            {
                provide: departments_repository_1.DepartmentsRepository,
                useClass: prisma_departments_repository_1.PrismaDepartmentRepository,
            },
            {
                provide: users_repository_1.UsersRepository,
                useClass: prisma_users_repository_1.PrismaUsersRepository,
            },
            {
                provide: profiles_repository_1.ProfilesRepository,
                useClass: prisma_profiles_repository_1.PrismaProfilesRepository,
            },
            {
                provide: profile_permissions_repository_1.ProfilePermissionsRepository,
                useClass: prisma_profile_permissions_repository_1.PrismaProfilePermissionsRepository,
            },
            {
                provide: events_repository_1.EventsRepository,
                useClass: prisma_events_repository_1.PrismaEventsRepository,
            },
            {
                provide: event_lots_repository_1.EventLotsRepository,
                useClass: prisma_event_lots_repository_1.PrismaEventLotsRepository,
            },
            {
                provide: event_addresses_repository_1.EventAddressesRepository,
                useClass: prisma_event_addresses_repository_1.PrismaEventAddressesRepository,
            },
            {
                provide: event_purchases_repository_1.EventPurchasesRepository,
                useClass: prisma_event_purchases_repository_1.PrismaEventPurchasesRepository,
            },
            {
                provide: event_tickets_repository_1.EventTicketsRepository,
                useClass: prisma_event_tickets_repository_1.PrismaEventTicketsRepository,
            },
            {
                provide: orders_repository_1.OrdersRepository,
                useClass: prisma_orders_repository_1.PrismaOrdersRepository,
            },
            {
                provide: parameters_repository_1.ParametersRepository,
                useClass: prisma_parameters_repository_1.PrismaParametersRepository,
            },
        ],
        exports: [
            prisma_service_1.PrismaService,
            logs_repository_1.LogsRepository,
            departments_repository_1.DepartmentsRepository,
            users_repository_1.UsersRepository,
            profiles_repository_1.ProfilesRepository,
            profile_permissions_repository_1.ProfilePermissionsRepository,
            events_repository_1.EventsRepository,
            event_lots_repository_1.EventLotsRepository,
            event_addresses_repository_1.EventAddressesRepository,
            event_purchases_repository_1.EventPurchasesRepository,
            event_tickets_repository_1.EventTicketsRepository,
            orders_repository_1.OrdersRepository,
            parameters_repository_1.ParametersRepository,
        ],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map