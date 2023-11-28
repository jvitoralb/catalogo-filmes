import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Movie } from '../movie.entity';
import { MOVIE_REPOSITORY } from '../../../config/constants';
import { MovieDto } from '../api/movie.dto';

@Injectable()
export class MovieService {
    constructor(
        @Inject(MOVIE_REPOSITORY)
        private readonly repository: Repository<Movie>
    ) { }
    
    async findAll(): Promise<Movie[]> {
        return await this.repository.find();
    }
    async findOne(movieId: string): Promise<Movie> {
        const movieFound = await this.repository.findBy({ id: movieId });
        return movieFound[0];
    }
    async createOne(newMovie: MovieDto): Promise<Movie> {
        return await this.repository.save(newMovie);
    }
    async updateOne(movieId: string, movieUpdates: MovieDto): Promise<Movie> {
        const movieToUpdate = await this.findOne(movieId);

        const updated = Object.assign({}, movieToUpdate, movieUpdates);
        updated.id = movieToUpdate.id;

        return await this.repository.save(updated);
    }
    async deleteOne(movieId: string): Promise<void> {
        await this.repository.delete(movieId);
    }
}
