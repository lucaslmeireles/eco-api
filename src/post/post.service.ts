import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreatePostDto, EditPostDto } from './dto';

@Injectable()
export class PostService {
    constructor(private prisma: DatabaseService) {}

    async listPosts() {
        const posts = this.prisma.posts.findMany();
        return posts;
    }
    async listPostById(postId: number) {
        const post = this.prisma.posts.findFirst({
            where: {
                id: postId,
            },
        });
        return post;
    }
    async createPost(dto: CreatePostDto, userId: number) {
        //TODO apenas o user aunteticado pode criar um post, @UseGuard aqui
        const post = await this.prisma.posts.create({
            data: {
                authorId: userId,
                ...dto,
            },
        });
        return post;
    }

    async editPost(postId: number, dto: EditPostDto) {
        //TODO apenas o user dono desse post pode edita-lo, @UseGuard + verificação do userId
        if (!dto.title && !dto.content) {
            throw new Error('Nenhum campo foi preenchido');
        }
        return await this.prisma.posts.update({
            where: {
                id: postId,
            },
            data: {
                ...dto,
            },
        });
    }
}
