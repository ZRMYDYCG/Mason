import { Global, Module } from '@nestjs/common'
import { AbilityFactory } from './ability.factory'
import { AuthGuard } from '../auth/auth.guard'

@Global()
@Module({
  providers: [AbilityFactory, AuthGuard],
  exports: [AbilityFactory, AuthGuard]
})
export class CaslModule {}
