import {
    Controller,
    Get,
    UseGuards,
    Patch,
    Body,
    Delete,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator/index';
import { JwtGuard } from '../auth/guard/index';
import { EditUserDto } from './dto/edit-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtGuard)
export class UsersController {
    constructor(private userService: UsersService) {}
    @Get('me')
    getMe(@GetUser() user: User) {
        return user;
    }
    @Patch()
    editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
        return this.userService.editUser(userId, dto);
    }

    @Delete('/delete/myaccount')
    deleteMyAccount(@GetUser('id') userId: number) {
        return this.userService.deleteMyAccount(userId);
    }

    @Get('/myposts')
    getPostByAuthor(@GetUser('id') userId: number) {
        return this.userService.listPostByAuthor(userId);
    }
}
