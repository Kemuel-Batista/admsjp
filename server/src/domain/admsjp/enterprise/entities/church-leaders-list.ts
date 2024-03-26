import { WatchedList } from '@/core/entities/watched-list'
import { ChurchLeaders } from './church-leaders'

export class ChurchLeadersList extends WatchedList<ChurchLeaders> {
  compareItems(a: ChurchLeaders, b: ChurchLeaders): boolean {
    // If the churdId is equal and leaderName is equal too
    return a.churchId.equals(b.churchId) && a.name === b.name
  }
}
