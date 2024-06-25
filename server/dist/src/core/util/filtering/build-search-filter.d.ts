import { Prisma } from 'Prisma';
import { ISearchParamDTO } from '@/core/dtos/search-param-dto';
import { WhereInput } from '@/core/types/where-input';
declare function buildSearchFilter<T extends Prisma.WhereInput>(searchParams?: ISearchParamDTO[]): WhereInput<T>;
export { buildSearchFilter };
