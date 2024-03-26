import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface ChurchDepartmentMemberProps {
  churchDepartmentId: UniqueEntityID
  name: string
  functionName: string
  subFunction: string
  phone: string
  email: string
  birthday: Date
  createdAt: Date
  updatedAt?: Date | null
  deletedAt?: Date | null
}

export class ChurchDepartmentMember extends Entity<ChurchDepartmentMemberProps> {
  get churchDepartmentId() {
    return this.props.churchDepartmentId
  }

  set churchDepartmentId(churchDepartmentId: UniqueEntityID) {
    this.props.churchDepartmentId = churchDepartmentId
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

  get subFunction() {
    return this.props.subFunction
  }

  set subFunction(subFunction: string) {
    this.props.subFunction = subFunction
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
    props: Optional<ChurchDepartmentMemberProps, 'createdAt' | 'deletedAt'>,
    id?: UniqueEntityID,
  ) {
    const churchDepartmentMember = new ChurchDepartmentMember(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        deletedAt: props.deletedAt ?? null,
      },
      id,
    )

    return churchDepartmentMember
  }
}
