import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { EditUserDto } from './dto/edit-user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: DatabaseService) {}

    async editUser(userId: number, dto: EditUserDto) {
        const user = await this.prisma.user.update({
            where: { id: userId },
            data: {
                ...dto,
            },
        });

        delete user.hash;
        return user;
    }

    async deleteMyAccount(userId: number) {
        const user = await this.prisma.user.delete({
            where: { id: userId },
        });
        return user;
    }
}
