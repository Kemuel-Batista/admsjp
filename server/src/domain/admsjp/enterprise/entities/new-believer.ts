import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

import { NewBelieverCreatedEvent } from '../events/new-believer-created'

export interface NewBelieverProps {
  churchId: UniqueEntityID
  name: string
  lastName: string
  phone: string
  email: string | null
  birthday: Date
  street: string
  neighborhood: string
  city: string
  state: string
  postalCode: string
  number: string
  status: number
  lgpd: boolean
  createdAt: Date
  updatedAt?: Date | null
  deletedAt?: Date | null
}

export class NewBeliever extends AggregateRoot<NewBelieverProps> {
  get churchId() {
    return this.props.churchId
  }

  set churchId(churchId: UniqueEntityID) {
    this.props.churchId = churchId
    this.touch()
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get lastName() {
    return this.props.lastName
  }

  set lastName(lastName: string) {
    this.props.lastName = lastName
    this.touch()
  }

  get phone() {
    return this.props.phone
  }

  set phone(phone: string) {
    this.props.phone = phone
    this.touch()
  }

  get email() {
    return this.props.email
  }

  set email(email: string | null) {
    this.props.email = email
    this.touch()
  }

  get birthday() {
    return this.props.birthday
  }

  set birthday(birthday: Date) {
    this.props.birthday = birthday
    this.touch()
  }

  get street() {
    return this.props.street
  }

  set street(street: string) {
    this.props.street = street
    this.touch()
  }

  get neighborhood() {
    return this.props.neighborhood
  }

  set neighborhood(neighborhood: string) {
    this.props.neighborhood = neighborhood
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

  get status() {
    return this.props.status
  }

  set status(status: number) {
    this.props.status = status
    this.touch()
  }

  get lgpd() {
    return this.props.lgpd
  }

  set lgpd(lgpd: boolean) {
    this.props.lgpd = lgpd
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
    props: Optional<NewBelieverProps, 'status' | 'createdAt' | 'deletedAt'>,
    id?: UniqueEntityID,
  ) {
    const newBeliever = new NewBeliever(
      {
        ...props,
        status: props.status ?? 0, // New Believer
        createdAt: props.createdAt ?? new Date(),
        deletedAt: props.deletedAt ?? null,
      },
      id,
    )

    const isNewBeliever = !id

    if (isNewBeliever) {
      newBeliever.addDomainEvent(new NewBelieverCreatedEvent(newBeliever))
    }

    return newBeliever
  }
}
