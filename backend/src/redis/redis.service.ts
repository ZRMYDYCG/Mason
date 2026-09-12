import { Injectable, OnModuleDestroy } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Redis from 'ioredis'

@Injectable()
export class RedisService implements OnModuleDestroy {
  readonly client: Redis

  constructor(config: ConfigService) {
    this.client = new Redis({
      host: config.get('REDIS_HOST') || 'localhost',
      port: Number(config.get('REDIS_PORT') || 6379)
    })
  }

  async onModuleDestroy() {
    await this.client.quit()
  }
}
