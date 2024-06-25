import { z } from 'zod';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
declare const paramsSchema: z.ZodPipeline<z.ZodEffects<z.ZodString, number, string>, z.ZodNumber>;
export declare const paramsValidationPipe: ZodValidationPipe;
export type ParamsSchema = z.infer<typeof paramsSchema>;
export {};
