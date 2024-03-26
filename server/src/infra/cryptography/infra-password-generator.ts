import { Injectable } from '@nestjs/common'

import { PasswordGenerator } from '@/domain/admsjp/application/cryptography/password-generator'

@Injectable()
export class InfraPasswordGenerator implements PasswordGenerator {
  private MAX_ACCESS_CODE_LENGTH = 8

  async generate(): Promise<string> {
    return this.generateRandomString(this.MAX_ACCESS_CODE_LENGTH)
  }

  private generateRandomString(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$^&*()_+-=[]{}|;:,.<>'
    let result = ''

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      result += characters.charAt(randomIndex)
    }

    return result.toUpperCase()
  }
}
