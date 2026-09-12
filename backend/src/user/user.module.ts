import { Module, forwardRef } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { RoleModule } from '../role/role.module'

@Module({
  imports: [forwardRef(() => RoleModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
