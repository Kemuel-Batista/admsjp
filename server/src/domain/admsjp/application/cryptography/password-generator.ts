export abstract class PasswordGenerator {
  abstract generate(): Promise<string>
}
