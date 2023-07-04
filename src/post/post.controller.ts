import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, EditPostDto } from './dto';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

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
    @UseGuards(JwtGuard)
    @Post('/create')
    createPost(@Body() dto: CreatePostDto, @GetUser('id') userId: number) {
        return this.PostService.createPost(dto, userId);
    }

    @UseGuards(JwtGuard)
    @Patch('/edit/:id')
    editPost(
        @Param('id', ParseIntPipe) postId: number,
        @Body() dto: EditPostDto,
        @GetUser('id') userId: number,
    ) {
        return this.PostService.editPost(postId, dto, userId);
    }
}
