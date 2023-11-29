import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './movie.entity';
import { MovieDto } from './movie.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('/movies')
@ApiUnauthorizedResponse({ description: 'Authorization token is required' })
@ApiBearerAuth()
@Controller('movies')
export class MovieController {
    constructor(
        private readonly service: MovieService
    ) { }

    @Get()
    @ApiOkResponse({ description: 'Retorna um Array com todos os filmes' })
    getAllMovies(): Promise<Movie[]> {
        return this.service.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ description: 'Retorna um filme de acordo com o :id' })
    @ApiBadRequestResponse({ description: 'Caso o id não conste no banco de dados' })
    getOneMovie(@Param('id') movieId: string): Promise<Movie> {
        return this.service.findOne(movieId);
    }

    @Post()
    @ApiCreatedResponse({ description: 'Retorna um objeto com todas as propriedades do filme, incluindo id' })
    @ApiBadRequestResponse({ description: 'Caso o falte propriedades no body enviado' })
    postOneMovie(@Body() newMovie: MovieDto): Promise<Movie> {
        return this.service.createOne(newMovie);
    }

    @Put(':id')
    @ApiOkResponse({ description: 'Retorna o objeto após todas as modificações' })
    @ApiBadRequestResponse({ description: 'Caso o falte propriedades no body enviado ou o id não conste no banco de dados' })
    putOneMovie(@Param('id') movieId: string, @Body() movieUpdates: MovieDto): Promise<Movie> {
        return this.service.updateOne(movieId, movieUpdates);
    }

    @Delete(':id')
    @HttpCode(204)
    @ApiNoContentResponse({ description: 'Não possui corpo de resposta' })
    @ApiBadRequestResponse({ description: 'Caso o id não conste no banco de dados' })
    deleteOneMovie(@Param('id') movieId: string): Promise<void> {
        return this.service.deleteOne(movieId);
    }
}
