import HttpStatusCode from '../enums/http-status-code';
interface IDeleteOptions {
    throwIfFound?: boolean;
    throwIfNotFound?: boolean;
    errorKeyFound?: string;
    errorKeyNotFound?: string;
    errorCodeFound?: HttpStatusCode;
    errorCodeNotFound?: HttpStatusCode;
    logKeyService?: string;
    logLevelService?: number;
}
export type { IDeleteOptions };
