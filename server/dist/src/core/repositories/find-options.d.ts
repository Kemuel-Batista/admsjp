import HttpStatusCode from '../enums/http-status-code';
interface IFindOptions {
    throwIfFound?: boolean;
    throwIfNotFound?: boolean;
    errorKeyFound?: string;
    errorKeyNotFound?: string;
    errorCodeFound?: HttpStatusCode;
    errorCodeNotFound?: HttpStatusCode;
}
export type { IFindOptions };
