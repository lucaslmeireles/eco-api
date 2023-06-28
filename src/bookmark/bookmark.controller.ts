import {
    Controller,
    Delete,
    Get,
    Patch,
    Post,
    UseGuards,
    Param,
    ParseIntPipe,
    Body,
    HttpCode,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
    constructor(private bookmarkService: BookmarkService) {}

    @Get()
    getBookmarks(@GetUser('id') userId: number) {
        return this.bookmarkService.getBookmarks(userId);
    }

    @Get(':id')
    getBookmarksbyId(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number,
    ) {
        return this.bookmarkService.getBookmarksbyId(userId, bookmarkId);
    }

    @Post()
    createBookmark(
        @GetUser('id') userId: number,
        @Body() dto: CreateBookmarkDto,
    ) {
        return this.bookmarkService.createBookmark(userId, dto);
    }

    @Patch(':id')
    updateBookmark(
        @GetUser('id') userId: number,
        @Body() dto: EditBookmarkDto,
        @Param('id', ParseIntPipe) bookmarkId: number,
    ) {
        return this.bookmarkService.updateBookmark(userId, dto, bookmarkId);
    }
    @HttpCode(204)
    @Delete(':id')
    deleteBookmark(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number,
    ) {
        return this.bookmarkService.deleteBookmark(userId, bookmarkId);
    }
}
