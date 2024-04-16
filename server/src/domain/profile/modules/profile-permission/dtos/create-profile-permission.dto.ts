import { type ProfilePermission } from '@prisma/client'

export interface CreateProfilePermissionDTO {
  profileId: ProfilePermission['profileId']
  key: ProfilePermission['key']
  createdBy: ProfilePermission['createdBy']
}
