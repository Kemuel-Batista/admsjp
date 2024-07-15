export abstract class QRCodeGenerator {
  abstract generate(link: string): Promise<Buffer>
}
