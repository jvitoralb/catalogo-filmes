import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DATA_SOURCE, MOVIE_REPOSITORY } from '../../config/constants';
import { Movie } from './movie.entity';
import { MovieController } from './api/movie.controller';
import { MovieService } from './service/movie.service';
import { RedisModule } from '../redis/redis.module';
import { DatabaseModule } from '../../providers/database/database.module';

@Module({
    imports: [
        DatabaseModule,
        RedisModule
    ],
    controllers: [MovieController],
    providers: [
        {
            provide: MOVIE_REPOSITORY,
            useFactory: (dataSource: DataSource) => dataSource.getRepository(Movie),
            inject: [DATA_SOURCE],
        },
        MovieService
    ],
})
export class MovieModule { }
