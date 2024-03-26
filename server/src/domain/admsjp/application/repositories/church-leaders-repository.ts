import { ChurchLeaders } from '../../enterprise/entities/church-leaders'

export abstract class ChurchLeadersRepository {
  abstract createMany(days: ChurchLeaders[]): Promise<void>
  abstract deleteMany(days: ChurchLeaders[]): Promise<void>
  abstract findManyByChurchId(churchId: string): Promise<ChurchLeaders[]>
  abstract deleteManyByChurchId(churchId: string): Promise<void>
}
