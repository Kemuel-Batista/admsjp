import { type Response } from 'express';
import HttpStatusCode from '../enums/http-status-code';
export declare class AppError extends Error {
    readonly statusCode: number;
    constructor(message: string, statusCode?: HttpStatusCode);
    getResponse(response: Response): Response;
}
