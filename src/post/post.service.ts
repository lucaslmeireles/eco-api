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
    async createPost(dto: CreatePostDto) {
        //TODO apenas o user aunteticado pode criar um post, @UseGuard aqui
        return await this.prisma.posts.create({
            data: {
                ...dto,
            },
        });
    }

    async editPost(postId: number, dto: EditPostDto) {
        //TODO apenas o user dono desse post pode edita-lo, @UseGuard + verificação do userId
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
