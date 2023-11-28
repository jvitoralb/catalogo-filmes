import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Movie } from 'src/movies/movie.entity';

describe('Application - e2e', () => {
    let app: INestApplication;
    let createdMovie: Movie;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('Gets an array with all movies', async () => {
        const res = await request(app.getHttpServer())
        .get('/movies');

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('Creates a new movie and returns the movie data', async () => {
        const reqBody = {
            title: 'Os Vingadores',
            year: 2011,
            description: 'Loki retorna à Terra enviado pelos chitauri, uma raça alienígena que pretende dominar os humanos.'
        }

        const res = await request(app.getHttpServer())
        .post('/movies')
        .send(reqBody);

        createdMovie = res.body;

        expect(res.status).toBe(201);
        expect(res.body).toMatchObject({
            ...reqBody,
            id: expect.any(String)
        });
    });

    it('Updates a movie and returns the updated data', async () => {
        const reqBody = {
            title: 'Os Vingadores',
            year: 2012,
            description: 'Loki retorna à Terra enviado pelos chitauri, uma raça alienígena que pretende dominar os humanos.'
        }

        const res = await request(app.getHttpServer())
        .put(`/movies/${createdMovie.id}`)
        .send(reqBody);

        createdMovie = res.body;

        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({
            ...reqBody, 
            id: expect.any(String)
        });
    });

    it('Gets only one movie', async () => {
        const res = await request(app.getHttpServer())
        .get(`/movies/${createdMovie.id}`);

        expect(res.status).toBe(200);
        expect(res.body).toMatchObject(createdMovie);
    });

    it('Deletes a movie and returns an empty body', async () => {
        const res = await request(app.getHttpServer())
        .delete(`/movies/${createdMovie.id}`);

        expect(res.status).toBe(204);
        expect(res.body).toEqual({});
    });
});
