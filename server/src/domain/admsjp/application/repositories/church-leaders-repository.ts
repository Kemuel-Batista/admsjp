import { ChurchLeader } from '../../enterprise/entities/church-leader'

export abstract class ChurchLeadersRepository {
  abstract createMany(churchLeaders: ChurchLeader[]): Promise<void>
  abstract deleteMany(churchLeaders: ChurchLeader[]): Promise<void>
  abstract findManyByChurchId(churchId: string): Promise<ChurchLeader[]>
  abstract deleteManyByChurchId(churchId: string): Promise<void>
}
