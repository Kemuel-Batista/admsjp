import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ValueObject } from '@/core/entities/value-object'

import { ChurchLeader } from '../church-leader'
import { ChurchDepartmentDetails } from './church-department-details'

export interface ChurchDetailsProps {
  churchId: UniqueEntityID
  name: string
  description: string
  street: string
  neighborhood: string
  city: string
  state: string
  postalCode: string
  number: string
  latitude: number
  longitude: number
  username: string
  leaders: ChurchLeader[]
  departments: ChurchDepartmentDetails[]
}

export class ChurchDetails extends ValueObject<ChurchDetailsProps> {
  get churchId() {
    return this.props.churchId
  }

  get name() {
    return this.props.name
  }

  get description() {
    return this.props.description
  }

  get street() {
    return this.props.street
  }

  get neighborhood() {
    return this.props.neighborhood
  }

  get city() {
    return this.props.city
  }

  get state() {
    return this.props.state
  }

  get postalCode() {
    return this.props.postalCode
  }

  get number() {
    return this.props.number
  }

  get latitude() {
    return this.props.latitude
  }

  get longitude() {
    return this.props.longitude
  }

  get username() {
    return this.props.username
  }

  get leaders() {
    return this.props.leaders
  }

  get departments() {
    return this.props.departments
  }

  static create(props: ChurchDetailsProps) {
    return new ChurchDetails(props)
  }
}
