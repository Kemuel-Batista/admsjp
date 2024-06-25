import { Prisma, User } from '@prisma/client';
import { ISearchParamDTO } from '@/core/dtos/search-param-dto';
import { IListOptions } from '@/core/repositories/list-options';
import { ListUserWithCountDTO, UpdateUserDTO } from '@/domain/admsjp/dtos/user';
import { UsersRepository } from '@/domain/admsjp/repositories/users-repository';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
export declare class PrismaUsersRepository implements UsersRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create({ email, name, password, photo, status, departmentId, profileId, provider, createdBy, }: Prisma.UserUncheckedCreateInput): Promise<User>;
    update({ id, email, name, password, status, departmentId, profileId, updatedBy, }: UpdateUserDTO): Promise<User>;
    list(options?: IListOptions, searchParams?: ISearchParamDTO[]): Promise<ListUserWithCountDTO>;
    findById(id: User['id']): Promise<User | null>;
    findByEmail(email: User['email']): Promise<User | null>;
    delete(userId: User['id']): Promise<void>;
}
