import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface ChurchLeaderProps {
  churchId: UniqueEntityID
  name: string
  functionName: string
  phone: string
  email: string
  birthday: Date
  createdAt: Date
  updatedAt?: Date | null
  deletedAt?: Date | null
}

export class ChurchLeader extends Entity<ChurchLeaderProps> {
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

  get functionName() {
    return this.props.functionName
  }

  set functionName(functionName: string) {
    this.props.functionName = functionName
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

  set email(email: string) {
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
    props: Optional<ChurchLeaderProps, 'createdAt' | 'deletedAt'>,
    id?: UniqueEntityID,
  ) {
    const churchLeaders = new ChurchLeader(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        deletedAt: props.deletedAt ?? null,
      },
      id,
    )

    return churchLeaders
  }
}
