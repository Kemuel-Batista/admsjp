import { Parameter, Prisma } from '@prisma/client';
import { ISearchParamDTO } from '@/core/dtos/search-param-dto';
import { IListOptions } from '@/core/repositories/list-options';
import { ListParameterDTO } from '@/domain/admsjp/dtos/parameter';
import { ParametersRepository } from '@/domain/admsjp/repositories/parameters-repository';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
export declare class PrismaParametersRepository implements ParametersRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create({ key, keyInfo, value, status, visible, createdBy, }: Prisma.ParameterUncheckedCreateInput): Promise<Parameter>;
    update({ id, key, keyInfo, value, status, visible, updatedBy, }: Parameter): Promise<Parameter>;
    list(options?: IListOptions, searchParams?: ISearchParamDTO[]): Promise<ListParameterDTO>;
    findById(id: Parameter['id']): Promise<Parameter | null>;
    findByKey(key: Parameter['key']): Promise<Parameter | null>;
}
