import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Redis } from 'ioredis';
import { RedisService } from './redis.service';
import { IOREDIS } from '../../config/constants';


@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: IOREDIS,
            useFactory: async () => {
                return new Redis(process.env.REDIS);
            }
        },
        RedisService,
    ],
    exports: [RedisService],
})
export class RedisModule { }
