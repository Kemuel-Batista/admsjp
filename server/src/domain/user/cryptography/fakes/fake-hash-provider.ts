import { HashProvider } from '../models/hash-provider'

export class FakeHashProvider implements HashProvider {
  async generateHash(payload: string): Promise<string> {
    return payload
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed
  }
}
