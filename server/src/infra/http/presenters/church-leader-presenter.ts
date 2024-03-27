import { ChurchLeader } from '@/domain/admsjp/enterprise/entities/church-leader'

export class ChurchLeaderPresenter {
  static toHTTP(churchLeader: ChurchLeader) {
    return {
      id: churchLeader.id.toString(),
      name: churchLeader.name,
      functionName: churchLeader.functionName,
      phone: churchLeader.phone,
      email: churchLeader.email,
      birthday: churchLeader.birthday,
    }
  }
}
