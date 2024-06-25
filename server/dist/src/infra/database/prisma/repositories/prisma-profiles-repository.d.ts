import { Profile } from '@prisma/client';
import { ISearchParamDTO } from '@/core/dtos/search-param-dto';
import { IListOptions } from '@/core/repositories/list-options';
import { CreateProfileDTO, ListProfileDTO, UpdateProfileDTO } from '@/domain/admsjp/dtos/profile';
import { ProfilesRepository } from '@/domain/admsjp/repositories/profiles-repository';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
export declare class PrismaProfilesRepository implements ProfilesRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create({ name, status, visible, createdBy, }: CreateProfileDTO): Promise<Profile>;
    update({ id, name, status, visible, updatedBy, }: UpdateProfileDTO): Promise<Profile>;
    list(options?: IListOptions, searchParams?: ISearchParamDTO[]): Promise<ListProfileDTO>;
    findById(id: Profile['id']): Promise<Profile | null>;
    findByName(name: Profile['name']): Promise<Profile | null>;
}
