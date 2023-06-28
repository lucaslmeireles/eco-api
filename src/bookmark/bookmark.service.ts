import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class BookmarkService {
    constructor(private prisma: DatabaseService) {}

    getBookmarks(userId: number) {
        return this.prisma.bookmark.findMany({
            where: {
                userId,
            },
        });
    }

    getBookmarksbyId(userId: number, bookmarkId: number) {
        return this.prisma.bookmark.findFirst({
            where: {
                userId,
                id: bookmarkId,
            },
        });
    }

    async createBookmark(userId: number, dto: CreateBookmarkDto) {
        return await this.prisma.bookmark.create({
            data: {
                userId,
                ...dto,
            },
        });
    }

    async updateBookmark(
        userId: number,
        dto: EditBookmarkDto,
        bookmarkId: number,
    ) {
        const bookmark = await this.prisma.bookmark.findUnique({
            where: {
                id: bookmarkId,
            },
        });
        if (!bookmark || bookmark.userId !== userId) {
            throw new ForbiddenException('Access Denied');
        }
        return this.prisma.bookmark.update({
            where: {
                id: bookmarkId,
            },
            data: {
                ...dto,
            },
        });
    }

    async deleteBookmark(userId: number, bookmarkId) {
        const bookmark = await this.prisma.bookmark.findUnique({
            where: {
                id: bookmarkId,
            },
        });
        if (!bookmark || bookmark.userId !== userId) {
            throw new ForbiddenException('Access Denied');
        }
        await this.prisma.bookmark.delete({
            where: {
                id: bookmarkId,
            },
        });
    }
}
