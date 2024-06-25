"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const get_user_permission_1 = require("../../domain/admsjp/use-cases/user/get-user-permission");
const event_http_module_1 = require("./events/event-http.module");
const profile_http_module_1 = require("./profile/profile-http.module");
const profile_permission_http_module_1 = require("./profile-permission/profile-permission-http.module");
const auth_http_module_1 = require("./user/auth-http.module");
const get_user_permission_controller_1 = require("./user/controllers/get-user-permission.controller");
const user_http_module_1 = require("./user/user-http.module");
const database_module_1 = require("../database/database.module");
const departments_http_module_1 = require("./departments/departments-http.module");
const event_address_http_module_1 = require("./event-address/event-address-http.module");
const event_lot_http_module_1 = require("./event-lot/event-lot-http.module");
const event_purchase_http_module_1 = require("./event-purchase/event-purchase-http.module");
const event_ticket_http_module_1 = require("./event-ticket/event-ticket-http.module");
const order_http_module_1 = require("./order/order-http.module");
const parameter_http_module_1 = require("./parameter/parameter-http.module");
let HttpModule = class HttpModule {
};
exports.HttpModule = HttpModule;
exports.HttpModule = HttpModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            auth_http_module_1.AuthHttpModule,
            core_1.RouterModule.register([{ path: 'auth', module: auth_http_module_1.AuthHttpModule }]),
            user_http_module_1.UserHttpModule,
            core_1.RouterModule.register([{ path: 'users', module: user_http_module_1.UserHttpModule }]),
            profile_http_module_1.ProfileHttpModule,
            profile_permission_http_module_1.ProfilePermissionHttpModule,
            core_1.RouterModule.register([
                {
                    path: 'profile',
                    module: profile_http_module_1.ProfileHttpModule,
                    children: [
                        {
                            path: 'profile-permission',
                            module: profile_permission_http_module_1.ProfilePermissionHttpModule,
                        },
                    ],
                },
            ]),
            departments_http_module_1.DepartmentsHttpModule,
            core_1.RouterModule.register([
                { path: 'departments', module: departments_http_module_1.DepartmentsHttpModule },
            ]),
            event_http_module_1.EventHttpModule,
            event_address_http_module_1.EventAddressHttpModule,
            event_lot_http_module_1.EventLotHttpModule,
            event_purchase_http_module_1.EventPurchaseHttpModule,
            event_ticket_http_module_1.EventTicketHttpModule,
            core_1.RouterModule.register([
                {
                    path: 'events',
                    module: event_http_module_1.EventHttpModule,
                    children: [
                        {
                            path: 'address',
                            module: event_address_http_module_1.EventAddressHttpModule,
                        },
                        {
                            path: 'lot',
                            module: event_lot_http_module_1.EventLotHttpModule,
                        },
                        {
                            path: 'purchases',
                            module: event_purchase_http_module_1.EventPurchaseHttpModule,
                        },
                        {
                            path: 'tickets',
                            module: event_ticket_http_module_1.EventTicketHttpModule,
                        },
                    ],
                },
            ]),
            parameter_http_module_1.ParameterHttpModule,
            core_1.RouterModule.register([{ path: 'parameter', module: parameter_http_module_1.ParameterHttpModule }]),
            order_http_module_1.OrderHttpModule,
            core_1.RouterModule.register([{ path: 'order', module: order_http_module_1.OrderHttpModule }]),
        ],
        controllers: [get_user_permission_controller_1.GetUserPermissionController],
        providers: [get_user_permission_1.GetUserPermissionUseCase],
    })
], HttpModule);
//# sourceMappingURL=http.module.js.map