import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { BookmarkController } from './bookmark/bookmark.controller';
import { BookmarkService } from './bookmark/bookmark.service';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PostModule } from './post/post.module';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        DatabaseModule,
        ConfigModule.forRoot({ isGlobal: true }),
        BookmarkModule,
        PostModule,
    ],
    controllers: [AppController, BookmarkController],
    providers: [AppService, BookmarkService],
})
export class AppModule {}
