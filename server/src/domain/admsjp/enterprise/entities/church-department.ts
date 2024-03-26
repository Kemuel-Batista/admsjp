import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

import { ChurchDepartmentMemberList } from './church-department-member-list'

export interface ChurchDepartmentProps {
  churchId: UniqueEntityID
  departmentId: UniqueEntityID
  members: ChurchDepartmentMemberList
  username: string
  password: string
  createdAt: Date
  updatedAt?: Date | null
  deletedAt?: Date | null
}

export class ChurchDepartment extends Entity<ChurchDepartmentProps> {
  get churchId() {
    return this.props.churchId
  }

  set churchId(churchId: UniqueEntityID) {
    this.props.churchId = churchId
    this.touch()
  }

  get departmentId() {
    return this.props.departmentId
  }

  set departmentId(departmentId: UniqueEntityID) {
    this.props.departmentId = departmentId
    this.touch()
  }

  get members() {
    return this.props.members
  }

  set members(members: ChurchDepartmentMemberList) {
    this.props.members = members
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
    props: Optional<
      ChurchDepartmentProps,
      'createdAt' | 'deletedAt' | 'members'
    >,
    id?: UniqueEntityID,
  ) {
    const churchDepartment = new ChurchDepartment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        deletedAt: props.deletedAt ?? null,
        members: props.members ?? new ChurchDepartmentMemberList(),
      },
      id,
    )

    return churchDepartment
  }
}
