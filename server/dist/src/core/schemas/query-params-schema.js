"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryValidationPipe = void 0;
const zod_1 = require("zod");
const zod_validation_pipe_1 = require("../../infra/http/pipes/zod-validation-pipe");
const pageQueryParamSchema = zod_1.z.object({
    page: zod_1.z
        .string()
        .optional()
        .default('1')
        .transform(Number)
        .pipe(zod_1.z.number().min(1)),
    pageSize: zod_1.z
        .string()
        .optional()
        .default('1')
        .transform(Number)
        .pipe(zod_1.z.number().min(1)),
    allRecords: zod_1.z.string().optional().default('false'),
});
exports.queryValidationPipe = new zod_validation_pipe_1.ZodValidationPipe(pageQueryParamSchema);
//# sourceMappingURL=query-params-schema.js.map