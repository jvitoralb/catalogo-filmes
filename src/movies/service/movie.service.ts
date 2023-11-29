import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../movie.entity';
import { MovieDto } from '../api/movie.dto';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class MovieService {
    constructor(
        @InjectRepository(Movie)
        private readonly repository: Repository<Movie>,
        private readonly cacheService: RedisService
    ) { }
    
    async findAll(): Promise<Movie[]> {
        const cacheKey = 'movies';
        const cachedMovies = await this.cacheService.getData(cacheKey);

        if (!cachedMovies) {
            const movies = await this.repository.find();
            
            const expiresIn = ((1 * 60) * 60);
            await this.cacheService.setData(cacheKey, JSON.stringify(movies), expiresIn);

            return movies;
        }

        return JSON.parse(cachedMovies);
    }
    async findOne(movieId: string): Promise<Movie> {
        const cacheKey = `movies:${movieId}`;
        const cachedTargetMovie = await this.cacheService.getData(cacheKey);

        if (!cachedTargetMovie) {
            const targetMovie = (await this.repository.findBy({ id: movieId }))[0];
            
            const expiresIn = ((1 * 60) * 60);
            await this.cacheService.setData(cacheKey, JSON.stringify(targetMovie), expiresIn);
            
            return targetMovie;
        }

        return JSON.parse(cachedTargetMovie);
    }
    async createOne(newMovie: MovieDto): Promise<Movie> {
        const createdMovie = await this.repository.save(newMovie);

        await this.cacheService.deleteKey('movies');

        return createdMovie;
    }
    async updateOne(movieId: string, movieUpdates: MovieDto): Promise<Movie> {
        const movieToUpdate = await this.findOne(movieId);

        const updated = Object.assign({}, movieToUpdate, movieUpdates);
        updated.id = movieToUpdate.id;

        await this.cacheService.deleteKeys(['movies', `movies:${movieId}`]);

        return await this.repository.save(updated);
    }
    async deleteOne(movieId: string): Promise<void> {
        await this.repository.delete(movieId);

        await this.cacheService.deleteKeys(['movies', `movies:${movieId}`]);
    }
}
