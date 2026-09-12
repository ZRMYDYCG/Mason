import { Injectable } from '@nestjs/common'
import { AbilityBuilder, createMongoAbility, MongoAbility } from '@casl/ability'
import { splitPermission } from './permissions'

export type AppAbility = MongoAbility<[string, string]>

@Injectable()
export class AbilityFactory {
  createForCodes(codes: string[], isSuper = false): AppAbility {
    const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility)
    if (isSuper) can('manage', 'all')
    for (const code of codes) {
      const { resource, action } = splitPermission(code)
      can(action, resource)
    }
    return build()
  }
}
