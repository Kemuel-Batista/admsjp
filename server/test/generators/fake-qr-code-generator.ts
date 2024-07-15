import { randomUUID } from 'node:crypto'

import { QRCodeGenerator } from '@/domain/admsjp/generators/qr-code-generator'

export class FakeQRCodeGenerator implements QRCodeGenerator {
  async generate(link: string): Promise<Buffer> {
    const url = randomUUID() + `${link}`

    return Buffer.from(url)
  }
}
