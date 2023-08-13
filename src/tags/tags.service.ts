import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TagsService {
    constructor(private prisma: DatabaseService) {}

    async listTags() {
        return await this.prisma.tag.findMany();
    }
}
