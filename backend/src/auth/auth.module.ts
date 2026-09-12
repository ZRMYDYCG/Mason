import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { UserModule } from '../user/user.module'

@Module({
  imports: [UserModule],
  controllers: [AuthController]
})
export class AuthModule {}
