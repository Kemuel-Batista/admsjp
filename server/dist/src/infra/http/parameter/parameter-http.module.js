"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterHttpModule = void 0;
const common_1 = require("@nestjs/common");
const create_parameter_1 = require("../../../domain/admsjp/use-cases/parameters/create-parameter");
const edit_parameter_1 = require("../../../domain/admsjp/use-cases/parameters/edit-parameter");
const find_parameter_by_id_1 = require("../../../domain/admsjp/use-cases/parameters/find-parameter-by-id");
const list_parameters_1 = require("../../../domain/admsjp/use-cases/parameters/list-parameters");
const database_module_1 = require("../../database/database.module");
const create_parameter_controller_1 = require("./controllers/create-parameter.controller");
const edit_parameter_controller_1 = require("./controllers/edit-parameter.controller");
const find_parameter_by_id_controller_1 = require("./controllers/find-parameter-by-id.controller");
const list_parameters_controller_1 = require("./controllers/list-parameters.controller");
let ParameterHttpModule = class ParameterHttpModule {
};
exports.ParameterHttpModule = ParameterHttpModule;
exports.ParameterHttpModule = ParameterHttpModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [
            create_parameter_controller_1.CreateParameterController,
            edit_parameter_controller_1.EditParameterController,
            find_parameter_by_id_controller_1.FindParameterByIdController,
            list_parameters_controller_1.ListParametersController,
        ],
        providers: [
            create_parameter_1.CreateParameterUseCase,
            edit_parameter_1.EditParameterUseCase,
            find_parameter_by_id_1.FindParameterByIdUseCase,
            list_parameters_1.ListParametersUseCase,
        ],
    })
], ParameterHttpModule);
//# sourceMappingURL=parameter-http.module.js.map