import { Parameter } from '@prisma/client';
export interface ListParameterDTO {
    parameters: Parameter[];
    count: number;
}
