import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class MovieDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(1800)
    @Max(2023)
    year: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;
}
