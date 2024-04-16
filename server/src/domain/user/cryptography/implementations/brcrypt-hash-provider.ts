import { compare, hash } from 'bcryptjs'

import { IHashProvider } from '../models/hash-provider'

export class BCryptHashProvider implements IHashProvider {
  async generateHash(payload: string): Promise<string> {
    return hash(payload, 8)
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed)
  }
}

export default BCryptHashProvider
