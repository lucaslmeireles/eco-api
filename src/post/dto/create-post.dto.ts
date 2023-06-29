import { IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
    @IsString()
    title: string;

    @IsString()
    small_text: string;

    @IsString()
    @IsOptional()
    cover_img?: string;

    @IsString()
    content: string;
}
