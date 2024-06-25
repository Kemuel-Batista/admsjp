import { Profile } from '@prisma/client'

export interface CreateProfileDTO {
  name: Profile['name']
  status: Profile['status']
  visible: Profile['visible']
  createdBy: Profile['createdBy']
}

export interface ListProfileDTO {
  profiles: Profile[]
  count: number
}

export interface UpdateProfileDTO {
  id: Profile['id']
  name: Profile['name']
  status: Profile['status']
  visible: Profile['visible']
  updatedBy: Profile['updatedBy']
}
