import { Injectable, UseGuards } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreatePostDto, EditPostDto } from './dto';
import { JwtGuard } from 'src/auth/guard';

@Injectable()
export class PostService {
    constructor(private prisma: DatabaseService) {}

    async listPosts() {
        const posts = this.prisma.posts.findMany();
        return posts;
    }
    async listPostById(postId: number) {
        const post = await this.prisma.posts.findFirst({
            where: {
                id: postId,
            },
            include: {
                author: true,
                Comment: true,
            },
        });
        return { data: post };
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

    async editPost(postId: number, dto: EditPostDto, userId: number) {
        //TODO apenas o user dono desse post pode edita-lo, @UseGuard + verificação do userId
        const authorIdPost = await this.prisma.posts.findFirst({
            where: {},
        });
        if (!authorIdPost) {
            throw new Error('Você não tem permissão para editar esse post');
        }
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
