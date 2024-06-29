import {
  AbilityBuilder,
  CreateAbility,
  createMongoAbility,
  MongoAbility,
} from '@casl/ability'

import { User } from './models/user'
import { permissions } from './permissions'

type AppAbilities =
  | ['manage' | 'get' | 'update' | 'delete', 'User']
  | [
      'manage' | 'get' | 'update' | 'delete' | 'create',
      'Event' | { id: string; departmentId: string; __typename: 'Event' },
    ]
  | ['manage' | 'get' | 'update' | 'delete', 'Department']
  | ['manage', 'all']

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityFor(user: User) {
  const builder = new AbilityBuilder(createAppAbility)

  user.roles.forEach((role) => {
    if (typeof permissions[role] !== 'function') {
      throw new Error(`Permissions for role ${role} not found.`)
    }

    permissions[role](user, builder)
  })

  const ability = builder.build({
    detectSubjectType(subject) {
      return subject.__typename
    },
  })

  ability.can = ability.can.bind(ability)
  ability.cannot = ability.cannot.bind(ability)

  return ability
}
