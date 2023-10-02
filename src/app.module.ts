import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { TagsModule } from './tags/tags.module';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        AuthModule,
        UsersModule,
        DatabaseModule,
        ConfigModule.forRoot({ isGlobal: true }),
        PostModule,
        TagsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
