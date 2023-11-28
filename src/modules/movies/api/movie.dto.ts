import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MovieDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNumber()
    @IsNotEmpty()
    year: number;

    @IsString()
    @IsNotEmpty()
    description: string;
}
