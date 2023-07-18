import { Injectable, UseGuards } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreatePostDto, EditPostDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { error } from 'console';

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
    @UseGuards(JwtGuard)
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
    @UseGuards(JwtGuard)
    async editPost(postId: number, dto: EditPostDto, userId: number) {
        //TODO apenas o user dono desse post pode edita-lo, @UseGuard + verificação do userId
        const authorIdPost = await this.prisma.posts.findFirst({
            where: { authorId: userId },
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

    async searchPost(slugPost: string) {
        //verificação se a pesquisa existe, e famoso contains
        if (!slugPost) {
            throw new Error('O campo de pesquisa nao pode estar vazio');
        }
        return await this.prisma.posts.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: slugPost,
                            mode: 'insensitive',
                        },
                    },
                    {
                        author: {
                            firstName: slugPost,
                        },
                    },
                    {
                        small_text: {
                            contains: slugPost,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
        });
    }

    async listPostByAuthor(userId: number) {
        if (!userId) {
            throw new Error('Seu usuario nao é valido');
        }
        const posts = await this.prisma.posts.findMany({
            where: {
                authorId: userId,
            },
        });
        return { posts };
    }
}
