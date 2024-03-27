import { Church } from "@/domain/admsjp/enterprise/entities/church";

export class ChurchPresenter {
  static toHTTP(church: Church) {
    return {
      id: church.id.toString(),
      name: church.name,
      description: church.description,
      street: church.street,
      neighborhood: church.neighborhood,
      postalCode: church.postalCode,
      number: church.number,
      latitude: church.latitude,
      longitude: church.longitude,
    }
  }
}
