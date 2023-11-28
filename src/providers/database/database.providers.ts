import { DATA_SOURCE } from '../../config/constants';
import { DataSource } from 'typeorm';

export const databaseProviders = [
    {
        provide: DATA_SOURCE,
        useFactory: async () => {
            const dataSource = new DataSource({
                type: 'postgres',
                host: process.env.PG_HOST,
                port: parseInt(process.env.PG_PORT, 10),
                username: process.env.PG_USERNAME,
                password: process.env.PG_PASSWORD,
                database: process.env.PG_DATABASE,
                entities: [
                    __dirname + '/../../modules/**/*.entity{.ts,.js}',
                ],
                // synchronize: true,
            });

            return dataSource.initialize();
        },
    },
];
