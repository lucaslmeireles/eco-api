import { IsOptional, IsString } from 'class-validator';

export class EditPostDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    small_text?: string;

    @IsString()
    @IsOptional()
    cover_img?: string;

    @IsString()
    @IsOptional()
    content?: string;
}
