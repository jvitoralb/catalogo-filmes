import { Module } from '@nestjs/common';
import { Movie } from './movie.entity';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { RedisModule } from '../redis/redis.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([Movie]),
        RedisModule
    ],
    controllers: [MovieController],
    providers: [MovieService],
})
export class MovieModule { }
