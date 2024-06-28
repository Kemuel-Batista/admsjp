import {
  AbilityBuilder,
  CreateAbility,
  createMongoAbility,
  MongoAbility,
} from '@casl/ability'
import { z } from 'zod'

import { User } from './models/user'
import { permissions } from './permissions'
import { departmentSubject } from './subjects/department'
import { eventSubject } from './subjects/event'

const appAbilitiesSchema = z.union([
  eventSubject,
  departmentSubject,
  z.tuple([z.literal('manage'), z.literal('all')]),
])

type AppAbilities = z.infer<typeof appAbilitiesSchema>

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

  const ability = builder.build()

  ability.can = ability.can.bind(ability)
  ability.cannot = ability.cannot.bind(ability)

  return ability
}
