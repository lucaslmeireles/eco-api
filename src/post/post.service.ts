import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PostService {
    constructor(private prisma: DatabaseService) {}

    async listPosts() {
        const posts = this.prisma.posts.findMany();
        return posts;
    }
}
