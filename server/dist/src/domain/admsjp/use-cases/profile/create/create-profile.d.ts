import { Profile } from '@prisma/client';
import { CreateProfileDTO } from '@/domain/admsjp/dtos/profile';
import { ProfilesRepository } from '@/domain/admsjp/repositories/profiles-repository';
import { FindProfileByNameUseCase } from '../find/by-name/find-profile-by-name';
export declare class CreateProfileUseCase {
    private profilesRepository;
    private findProfileByName;
    constructor(profilesRepository: ProfilesRepository, findProfileByName: FindProfileByNameUseCase);
    execute({ name, status, visible, createdBy, }: CreateProfileDTO): Promise<Profile>;
}
