import { AbilityBuilder } from '@casl/ability'

import { AppAbility } from '.'
import { User } from './models/user'
import { Role } from './roles'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN(_, { can }) {
    can('manage', 'all')
  },
  MANAGER_EVENTS(user, { can, cannot }) {
    cannot(['get', 'create', 'delete', 'update'], 'Event')
    can(['get', 'create', 'delete', 'update'], 'Event', {
      departmentId: { $eq: user.departmentId },
    })
  },
}
