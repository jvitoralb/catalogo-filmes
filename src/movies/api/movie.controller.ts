import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { MovieService } from '../service/movie.service';
import { Movie } from '../movie.entity';
import { MovieDto } from './movie.dto';

@Controller('movies')
export class MovieController {
    constructor(
        private readonly service: MovieService
    ) { }

    @Get()
    getAllMovies(): Promise<Movie[]> {
        return this.service.findAll();
    }

    @Get(':id')
    getOneMovie(@Param('id') movieId: string): Promise<Movie> {
        return this.service.findOne(movieId);
    }

    @Post()
    postOneMovie(@Body() newMovie: MovieDto): Promise<Movie> {
        return this.service.createOne(newMovie);
    }

    @Put(':id')
    putOneMovie(@Param('id') movieId: string, @Body() movieUpdates: MovieDto): Promise<Movie> {
        return this.service.updateOne(movieId, movieUpdates);
    }

    @Delete(':id')
    @HttpCode(204)
    deleteOneMovie(@Param('id') movieId: string): Promise<void> {
        return this.service.deleteOne(movieId);
    }
}
