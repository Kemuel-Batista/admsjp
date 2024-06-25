import { Prisma, User } from '@prisma/client';
import { ISearchParamDTO } from '@/core/dtos/search-param-dto';
import { IListOptions } from '@/core/repositories/list-options';
import { ListUserWithCountDTO, UpdateUserDTO } from '../dtos/user';
export declare abstract class UsersRepository {
    abstract create(data: Prisma.UserUncheckedCreateInput): Promise<User>;
    abstract update(data: UpdateUserDTO): Promise<User>;
    abstract list(options?: IListOptions, searchParams?: ISearchParamDTO[]): Promise<ListUserWithCountDTO>;
    abstract findById(id: User['id']): Promise<User | null>;
    abstract findByEmail(email: User['email']): Promise<User | null>;
    abstract delete(userId: User['id']): Promise<void>;
}
