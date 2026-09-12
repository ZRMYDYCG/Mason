import { Module, forwardRef } from '@nestjs/common'
import { RoleController } from './role.controller'
import { RoleService } from './role.service'
import { UserModule } from '../user/user.module'

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService]
})
export class RoleModule {}
