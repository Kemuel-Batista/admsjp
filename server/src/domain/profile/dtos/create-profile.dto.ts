import { Profile } from '@prisma/client'

export interface CreateProfileDTO {
  name: Profile['name']
  status: Profile['status']
  visible: Profile['visible']
  createdBy: Profile['createdBy']
}
