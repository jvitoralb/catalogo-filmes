import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Movie } from 'src/movies/movie.entity';

describe('Application - e2e', () => {
    let app: INestApplication;
    let createdMovie: Movie;
    let authToken: string;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('Creates a user successfully', async () => {
        const res = await request(app.getHttpServer())
        .post('/auth/signup')
        .send({
            email: 'admin2@mail.com',
            password: 'adminpassword123'
        });

        expect(res.status).toBe(201);
        expect(res.body).toMatchObject({
            accessToken: expect.any(String)
        });
    });

    it('Returns an access token when user successfully logs in', async () => {
        const res = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
            email: 'admin@mail.com',
            password: 'adminpassword123'
        });

        authToken = `Bearer ${res.body.accessToken}`;

        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({
            accessToken: expect.any(String)
        });
    });

    it('Gets an array with all movies', async () => {
        const res = await request(app.getHttpServer())
        .get('/movies')
        .set('Authorization', authToken);

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
        .send(reqBody)
        .set('Authorization', authToken);

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
        .send(reqBody)
        .set('Authorization', authToken);

        createdMovie = res.body;

        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({
            ...reqBody, 
            id: expect.any(String)
        });
    });

    it('Gets only one movie', async () => {
        const res = await request(app.getHttpServer())
        .get(`/movies/${createdMovie.id}`)
        .set('Authorization', authToken);

        expect(res.status).toBe(200);
        expect(res.body).toMatchObject(createdMovie);
    });

    it('Deletes a movie and returns an empty body', async () => {
        const res = await request(app.getHttpServer())
        .delete(`/movies/${createdMovie.id}`)
        .set('Authorization', authToken);

        expect(res.status).toBe(204);
        expect(res.body).toEqual({});
    });
});
