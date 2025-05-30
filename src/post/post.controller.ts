import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put,
    Query,
    UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto, EditPostDto } from './dto';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

//rota DELETE /post/delete/:id

@Controller('post')
export class PostController {
    constructor(private PostService: PostService) {}

    @UseGuards(JwtGuard)
    @Post('/create')
    createPost(@Body() dto: CreatePostDto, @GetUser('id') userId: number) {
        return this.PostService.createPost(dto, userId);
    }

    @UseGuards(JwtGuard)
    @Put('/edit/:id')
    editPost(
        @Param('id', ParseIntPipe) postId: number,
        @Body() dto: EditPostDto,
        @GetUser('id') userId: number,
    ) {
        return this.PostService.editPost(postId, dto, userId);
    }

    @UseGuards(JwtGuard)
    @Delete('/delete/:id')
    deletePost(
        @Param('id', ParseIntPipe) postId: number,
        @GetUser('id') userId: number,
    ) {
        return this.PostService.deletePost(postId, userId);
    }

    @UseGuards(JwtGuard)
    @Post('/like/:id')
    likePost(
        @Param('id', ParseIntPipe) postId: number,
        @GetUser('id') userId: number,
    ) {
        return this.PostService.likePost(postId, userId);
    }

    @UseGuards(JwtGuard)
    @Post('/deslike/:id')
    deslikePost(
        @Param('id', ParseIntPipe) postId: number,
        @GetUser('id') userId: number,
    ) {
        return this.PostService.deslikePost(postId, userId);
    }

    @Get('/search')
    searchPost(@Query('q') postSlug: string) {
        return this.PostService.searchPost(postSlug);
    }

    @Get('/featured')
    listFeaturedPosts() {
        return this.PostService.listFeaturedPosts();
    }

    @Get('/view/:id')
    listOnePost(@Param('id', ParseIntPipe) postId: number) {
        return this.PostService.listPostById(postId);
    }

    @Get('')
    async listPosts() {
        return this.PostService.listPosts();
    }
}
