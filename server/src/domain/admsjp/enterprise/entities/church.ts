import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { ChurchLeadersList } from './church-leaders-list'

export interface ChurchProps {
  name: string
  description: string
  street: string
  neighbourhood: string
  city: string
  state: string
  postalCode: string
  number: string
  latitude: number
  longitude: number
  username: string
  password: string
  leaders: ChurchLeadersList
  createdAt: Date
  updatedAt?: Date | null
  deletedAt?: Date | null
}

export class Church extends Entity<ChurchProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get description() {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description
    this.touch()
  }

  get street() {
    return this.props.street
  }

  set street(street: string) {
    this.props.street = street
    this.touch()
  }

  get neighbourhood() {
    return this.props.neighbourhood
  }

  set neighbourhood(neighbourhood: string) {
    this.props.neighbourhood = neighbourhood
    this.touch()
  }

  get city() {
    return this.props.city
  }

  set city(city: string) {
    this.props.city = city
    this.touch()
  }

  get state() {
    return this.props.state
  }

  set state(state: string) {
    this.props.state = state
    this.touch()
  }

  get postalCode() {
    return this.props.postalCode
  }

  set postalCode(postalCode: string) {
    this.props.postalCode = postalCode
    this.touch()
  }

  get number() {
    return this.props.number
  }

  set number(number: string) {
    this.props.number = number
    this.touch()
  }

  get latitude() {
    return this.props.latitude
  }

  set latitude(latitude: number) {
    this.props.latitude = latitude
    this.touch()
  }

  get longitude() {
    return this.props.longitude
  }

  set longitude(longitude: number) {
    this.props.longitude = longitude
    this.touch()
  }

  get leaders() {
    return this.props.leaders
  }

  set leaders(leaders: ChurchLeadersList) {
    this.props.leaders = leaders
    this.touch()
  }

  get username() {
    return this.props.username
  }

  set username(username: string) {
    this.props.username = username
    this.touch()
  }

  get password() {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  get deletedAt() {
    return this.props.deletedAt
  }

  set deletedAt(deletedAt: Date | null) {
    this.props.deletedAt = deletedAt
    this.touch()
  }

  static create(
    props: Optional<ChurchProps, 'createdAt' | 'deletedAt' | 'leaders'>,
    id?: UniqueEntityID,
  ) {
    const church = new Church(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        deletedAt: props.deletedAt ?? null,
        leaders: props.leaders ?? new ChurchLeadersList(),
      },
      id,
    )

    return church
  }
}
