import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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
                synchronize: true,
                autoLoadEntities:true
            })
        })
    ]
})
export class DatabaseModule { }
