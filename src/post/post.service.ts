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
    @UseGuards(JwtGuard)
    async createPost(dto: CreatePostDto, userId: number) {
        //TODO apenas o user aunteticado pode criar um post, @UseGuard aqui
        console.log(dto);
        const post = await this.prisma.posts.create({
            data: {
                authorId: userId,
                content: dto.content,
                cover_img: dto.cover_img,
                small_text: dto.small_text,
                title: dto.title,
                tags: {
                    connectOrCreate: dto.tags.map((tag) => {
                        return {
                            where: { name: tag },
                            create: { name: tag },
                        };
                    }),
                },
            },
        });
        return post;
    }

    async editPost(postId: number, dto: EditPostDto, userId: number) {
        //TODO apenas o user dono desse post pode edita-lo, @UseGuard + verificação do userId
        const authorIdPost = await this.prisma.posts.findFirst({
            where: { authorId: userId, AND: { id: postId } },
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
    async likePost(postId: number, userId: number) {
        return this.prisma.posts.update({
            where: {
                id: postId,
            },
            data: {
                likedBy: {
                    connect: {
                        id: userId,
                    },
                },
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
                    {
                        tags: {
                            some: {
                                name: slugPost,
                            },
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

    async howManyLikes(postId: number) {
        return await this.prisma.posts.findFirst({
            where: {
                id: postId,
            },
            select: {
                _count: {
                    select: {
                        likedBy: true,
                    },
                },
            },
        });
    }
}
