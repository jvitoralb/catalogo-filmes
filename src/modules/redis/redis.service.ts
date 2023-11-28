import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { IOREDIS } from '../../config/constants';

@Injectable()
export class RedisService {
    constructor(
        @Inject(IOREDIS) private readonly redisClient: Redis
    ) { }

    async getData(key: string): Promise<string> {
        return await this.redisClient.get(key);
    }
    async setData(key: string, value: string | number, expiresIn?: number): Promise<void> {
        if (expiresIn) {
            await this.redisClient.setex(key, expiresIn, value);
        } else {
            await this.redisClient.set(key, value);
        }
    }
    async deleteKeys(keys: string[]): Promise<void> {
        for(let i = 0; i < keys.length; i++) {
            await this.redisClient.del(keys[i]);
        }
    }
    async deleteKey(key: string): Promise<void> {
        await this.redisClient.del(key);
    }
    async resetCache(): Promise<void> {
        await this.redisClient.flushall();
    }
}
