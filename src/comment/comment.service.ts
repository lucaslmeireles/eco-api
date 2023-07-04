import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CommentService {
    constructor(private prisma: DatabaseService) {}

    async listComments(postId: number) {
        const comments = await this.prisma.comment.findMany({
            where: {
                postId,
            },
        });
        return comments;
    }
}
