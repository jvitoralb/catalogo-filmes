import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('movies')
export class Movie {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 75 })
    title: string;

    @Column()
    year: number;

    @Column('text')
    description: string;
}
