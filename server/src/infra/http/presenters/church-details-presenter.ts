import { ChurchDetails } from '@/domain/admsjp/enterprise/entities/value-objects/church-details'

import { ChurchDepartmentDetailsPresenter } from './church-department-details-presenter'
import { ChurchLeaderPresenter } from './church-leader-presenter'

export class ChurchDetailsPresenter {
  static toHTTP(church: ChurchDetails) {
    return {
      id: church.churchId.toString(),
      name: church.name,
      description: church.description,
      street: church.street,
      neighborhood: church.neighborhood,
      city: church.city,
      state: church.state,
      postalCode: church.postalCode,
      number: church.number,
      latitude: church.latitude,
      longitude: church.longitude,
      username: church.username,
      leaders: church.leaders.map(ChurchLeaderPresenter.toHTTP),
      departments: church.departments.map(
        ChurchDepartmentDetailsPresenter.toHTTP,
      ),
    }
  }
}
