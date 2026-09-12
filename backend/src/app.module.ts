import { Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import path from 'path'
import { AuthModule } from './auth/auth.module'
import { CaptchaModule } from './captcha/captcha.module'
import { CaslModule } from './casl/casl.module'
import { DepartmentModule } from './department/department.module'
import { LogModule } from './log/log.module'
import { OperationLogInterceptor } from './log/operation-log.interceptor'
import { MenuModule } from './menu/menu.module'
import { PrismaModule } from './prisma/prisma.module'
import { RedisModule } from './redis/redis.module'
import { ResponseInterceptor } from './common/response.interceptor'
import { RoleModule } from './role/role.module'
import { UploadModule } from './upload/upload.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env', '.env.example'] }),
    ServeStaticModule.forRoot({
      rootPath: path.join(process.cwd(), 'public'),
      serveRoot: '/public'
    }),
    PrismaModule,
    RedisModule,
    CaslModule,
    LogModule,
    AuthModule,
    UserModule,
    RoleModule,
    MenuModule,
    DepartmentModule,
    CaptchaModule,
    UploadModule
  ],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: OperationLogInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor }
  ]
})
export class AppModule {}
