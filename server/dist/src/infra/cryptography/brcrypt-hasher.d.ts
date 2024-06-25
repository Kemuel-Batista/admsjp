import { HashComparer } from '@/domain/admsjp/cryptography/hash-comparer';
import { HashGenerator } from '@/domain/admsjp/cryptography/hash-generator';
export declare class BcryptHasher implements HashGenerator, HashComparer {
    hash(payload: string): Promise<string>;
    compare(payload: string, hashed: string): Promise<boolean>;
}
