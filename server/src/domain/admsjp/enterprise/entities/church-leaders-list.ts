import { WatchedList } from '@/core/entities/watched-list'

import { ChurchLeader } from './church-leader'

export class ChurchLeaderList extends WatchedList<ChurchLeader> {
  compareItems(a: ChurchLeader, b: ChurchLeader): boolean {
    // If the churdId is equal and leaderName is equal too
    return a.churchId.equals(b.churchId) && a.name === b.name
  }
}
