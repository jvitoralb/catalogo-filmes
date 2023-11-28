import { Module } from '@nestjs/common';
import { MovieController } from './api/movie.controller';
import { MovieService } from './service/movie.service';
import { DatabaseModule } from '../../providers/database/database.module';
import { DATA_SOURCE, MOVIE_REPOSITORY } from '../../config/constants';
import { DataSource } from 'typeorm';
import { Movie } from './movie.entity';


@Module({
    imports: [DatabaseModule],
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
