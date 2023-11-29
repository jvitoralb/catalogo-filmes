import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DATA_SOURCE, MOVIE_REPOSITORY } from '../config/constants';
import { Movie } from './movie.entity';
import { MovieController } from './api/movie.controller';
import { MovieService } from './service/movie.service';
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
