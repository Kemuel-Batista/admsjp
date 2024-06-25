import { Profile } from '@prisma/client';
import { IFindOptions } from '@/core/repositories/find-options';
import { ProfilesRepository } from '@/domain/admsjp/repositories/profiles-repository';
type TFindProfileByIdUseCase<Options extends IFindOptions> = Profile | (Options['throwIfNotFound'] extends true ? never : null);
declare class FindProfileByIdUseCase {
    private profilesRepository;
    constructor(profilesRepository: ProfilesRepository);
    execute<Options extends IFindOptions>(id: Profile['id'], options?: Partial<Options>): Promise<TFindProfileByIdUseCase<Options>>;
}
export { FindProfileByIdUseCase };
