import { Response } from 'express';
import HttpStatusCode from '../enums/http-status-code';
export declare class AuthError extends Error {
    readonly statusCode: number;
    readonly errorKey: string;
    constructor(errorKey: string, statusCode?: HttpStatusCode);
    getResponse(response: Response): Response;
}
