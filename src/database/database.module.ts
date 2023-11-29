import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from '../movies/movie.entity';
import { User } from '../users/user.entity';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async () => ({
                type: 'postgres',
                host: process.env.PG_HOST,
                port: parseInt(process.env.PG_PORT, 10),
                username: process.env.PG_USERNAME,
                password: process.env.PG_PASSWORD,
                database: process.env.PG_DATABASE,
                entities: [User, Movie],
                synchronize: true,
            })
        })
    ]
})
export class DatabaseModule { }
