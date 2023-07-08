import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config/dist';

@Injectable()
export class DatabaseService extends PrismaClient {
    constructor(config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get('POSTGRES_URL'),
                },
            },
        });
    }

    cleanDb() {
        return this.$transaction([this.user.deleteMany({})]);
    }
}
