import { z } from 'zod';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
declare const pageQueryParamSchema: z.ZodObject<{
    page: z.ZodPipeline<z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, number, string>, z.ZodNumber>;
    pageSize: z.ZodPipeline<z.ZodEffects<z.ZodDefault<z.ZodOptional<z.ZodString>>, number, string>, z.ZodNumber>;
    allRecords: z.ZodDefault<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    page?: number;
    pageSize?: number;
    allRecords?: string;
}, {
    page?: string;
    pageSize?: string;
    allRecords?: string;
}>;
export declare const queryValidationPipe: ZodValidationPipe;
export type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>;
export {};
