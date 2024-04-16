import { Profile } from '@prisma/client'

export interface UpdateProfileDTO {
  id: Profile['id']
  name: Profile['name']
  status: Profile['status']
  visible: Profile['visible']
  updatedBy: Profile['updatedBy']
}
