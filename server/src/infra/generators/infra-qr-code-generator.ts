import { Injectable } from '@nestjs/common'
import * as qrcode from 'qrcode'

import { QRCodeGenerator } from '@/domain/admsjp/generators/qr-code-generator'

import { logger } from '../config/winston-config'

@Injectable()
export class InfraQRCodeGenerator implements QRCodeGenerator {
  async generate(link: string): Promise<Buffer> {
    try {
      const qrCodeDataURL = await qrcode.toDataURL(link)

      return Buffer.from(qrCodeDataURL)
    } catch (error) {
      logger.error(`QR Code Generator Error - ${error}`)
      throw error
    }
  }
}
