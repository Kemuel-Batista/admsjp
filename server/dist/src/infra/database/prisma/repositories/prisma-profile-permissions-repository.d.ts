import { Prisma, ProfilePermission } from '@prisma/client';
import { ISearchParamDTO } from '@/core/dtos/search-param-dto';
import { IListOptions } from '@/core/repositories/list-options';
import { ProfilePermissionsRepository } from '@/domain/admsjp/repositories/profile-permissions-repository';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
export declare class PrismaProfilePermissionsRepository implements ProfilePermissionsRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create({ profileId, key, createdBy, }: Prisma.ProfilePermissionUncheckedCreateInput): Promise<ProfilePermission>;
    list(options?: IListOptions, searchParams?: ISearchParamDTO[]): Promise<ProfilePermission[]>;
    listByProfileId(profileId: ProfilePermission['profileId'], options?: IListOptions, searchParams?: ISearchParamDTO[]): Promise<ProfilePermission[]>;
    findById(id: ProfilePermission['id']): Promise<ProfilePermission | null>;
    findByKeyProfileId(key: ProfilePermission['key'], profileId: ProfilePermission['profileId']): Promise<ProfilePermission | null>;
    delete(id: ProfilePermission['id']): Promise<void>;
}
