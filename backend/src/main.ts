import { NestFactory } from '@nestjs/core'
import cookieParser from 'cookie-parser'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './common/http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser())
  app.enableCors({
    origin: '*',
    credentials: true
  })
  app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(Number(process.env.APP_PORT || 8000), process.env.APP_HOST || 'localhost')
  console.log(`应用运行在: http://127.0.0.1:${process.env.APP_PORT || 8000}`)
}

bootstrap()
