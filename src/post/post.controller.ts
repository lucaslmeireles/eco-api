import { Body, Controller, Get } from '@nestjs/common';
import { PostService } from './post.service';
import { DatabaseService } from 'src/database/database.service';

@Controller('post')
export class PostController {
    constructor(private PostService: PostService) {}

    @Get('')
    async listPosts() {
        return this.PostService.listPosts();
    }

    async listOnePost(@Body() id);
}
