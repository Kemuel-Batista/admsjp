"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramsValidationPipe = void 0;
const zod_1 = require("zod");
const zod_validation_pipe_1 = require("../../infra/http/pipes/zod-validation-pipe");
const paramsSchema = zod_1.z.string().transform(Number).pipe(zod_1.z.number().min(1));
exports.paramsValidationPipe = new zod_validation_pipe_1.ZodValidationPipe(paramsSchema);
//# sourceMappingURL=params-schema.js.map