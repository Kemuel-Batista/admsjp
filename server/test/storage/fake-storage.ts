import { randomUUID } from 'node:crypto'

import { Uploader, UploadParams } from '@/domain/admsjp/storage/uploader'

interface Upload {
  fileName: string
  url: string
}

export class FakeUploader implements Uploader {
  public uploads: Upload[] = []

  async upload({ fileName }: UploadParams): Promise<{ url: string }> {
    const url = randomUUID()

    this.uploads.push({
      fileName,
      url,
    })

    return { url }
  }

  async delete(url: string): Promise<void> {
    const itemIndex = this.uploads.findIndex((item) => item.url === url)

    this.uploads.splice(itemIndex, 1)
  }
}
