import { ListParametersUseCase } from '@/domain/admsjp/use-cases/parameters/list-parameters';
export declare class ListParametersController {
    private listParametersUseCase;
    constructor(listParametersUseCase: ListParametersUseCase);
    handle(): Promise<{
        parameters: {
            id: number;
            uuid: string;
            key: string;
            keyInfo: string;
            value: string;
            status: number;
            visible: number;
            createdAt: Date;
            createdBy: number;
            updatedAt: Date;
            updatedBy: number;
        }[];
        count: number;
    }>;
}
