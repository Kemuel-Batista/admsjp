import { Uploader, UploadParams } from '@/domain/admsjp/storage/uploader';
import { EnvService } from '../env/env.service';
export declare class R2Storage implements Uploader {
    private envService;
    private client;
    constructor(envService: EnvService);
    upload({ fileName, fileType, body, }: UploadParams): Promise<{
        url: string;
    }>;
    delete(url: string): Promise<void>;
}
