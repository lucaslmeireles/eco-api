import { Injectable, UseGuards } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateCommentDto } from './dto';
import { JwtGuard } from 'src/auth/guard';

@Injectable()
export class CommentService {
    constructor(private prisma: DatabaseService) {}
    @UseGuards(JwtGuard)
    async createComment(postId: number, dto: CreateCommentDto, userId: number) {
        return await this.prisma.comment.create({
            data: {
                ...dto,
                postId,
                userId,
            },
        });
    }
    @UseGuards(JwtGuard)
    async deleteComment(commentId: number) {
        return await this.prisma.comment.delete({
            where: {
                id: commentId,
            },
        });
    }

}
