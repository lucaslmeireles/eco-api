import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, EditPostDto } from './dto';

@Controller('post')
export class PostController {
    constructor(private PostService: PostService) {}

    @Get('')
    async listPosts() {
        return this.PostService.listPosts();
    }

    @Get(':id')
    listOnePost(@Param('id', ParseIntPipe) postId: number) {
        return this.PostService.listPostById(postId);
    }

    @Post('/create')
    createPost(@Body() dto: CreatePostDto) {
        return this.PostService.createPost(dto);
    }

    @Patch(':id')
    editPost(
        @Param('id', ParseIntPipe) postId: number,
        @Body() dto: EditPostDto,
    ) {
        return this.PostService.editPost(postId, dto);
    }
}
