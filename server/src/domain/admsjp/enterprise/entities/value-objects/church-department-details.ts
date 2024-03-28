import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ValueObject } from '@/core/entities/value-object'

import { ChurchDepartmentMember } from '../church-department-member'

export interface ChurchDepartmentDetailsProps {
  churchDepartmentId: UniqueEntityID
  churchId: UniqueEntityID
  departmentId: UniqueEntityID
  departmentName: string
  username: string
  members: ChurchDepartmentMember[]
}

export class ChurchDepartmentDetails extends ValueObject<ChurchDepartmentDetailsProps> {
  get churchDepartmentId() {
    return this.props.churchDepartmentId
  }

  get churchId() {
    return this.props.churchId
  }

  get departmentId() {
    return this.props.departmentId
  }

  get departmentName() {
    return this.props.departmentName
  }

  get username() {
    return this.props.username
  }

  get members() {
    return this.props.members
  }

  static create(props: ChurchDepartmentDetailsProps) {
    return new ChurchDepartmentDetails(props)
  }
}
