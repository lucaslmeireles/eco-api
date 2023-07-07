import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
    Delete
} from '@nestjs/common';
import { CommentService } from './comment.service';
import {GetUser} from 'src/auth/decorator';
import {CreateCommentDto} from './dto';

@Controller('comment')
export class CommentController {
    constructor(private CommentService: CommentService) {}
    //Add comment and delete comment
    @Post('/:id')
    async createComment(@Body() dto: CreateCommentDto, 
    @GetUser('userId') userId: number, 
    @Param('id', ParseIntPipe) postId: number ) 
    // id and post id should be here
    {
        return this.CommentService.createComment(postId, dto, userId)
    }

    @Delete('/:id')
    async deleteComment(@Param('id', ParseIntPipe) commentId: number) {
        return this.CommentService.deleteComment(commentId);
    }
}
