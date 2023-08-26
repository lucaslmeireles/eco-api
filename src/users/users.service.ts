import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { EditUserDto } from './dto/edit-user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: DatabaseService) {}

    async editUser(userId: number, dto: EditUserDto) {
        const user = await this.prisma.user.update({
            where: { id: userId },
            data: {
                ...dto,
            },
        });

        delete user.hash;
        return user;
    }

    async deleteMyAccount(userId: number) {
        const user = await this.prisma.user.delete({
            where: { id: userId },
        });
        return user;
    }

    async listPostByAuthor(userId: number) {
        if (!userId) {
            throw new Error('Seu usuario nao é valido');
        }
        const posts = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                posts: {
                    select: {
                        title: true,
                        small_text: true,
                        cover_img: true,
                        id: true,
                        status: true,
                    },
                },
            },
        });
        const likedposts = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                myLikedPosts: {
                    select: {
                        title: true,
                        small_text: true,
                        cover_img: true,
                        id: true,
                    },
                },
            },
        });
        return { myposts: posts.posts, likedposts: likedposts.myLikedPosts };
    }
}
