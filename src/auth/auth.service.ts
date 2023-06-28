import { Injectable, HttpCode } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as argon from 'argon2';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import { ConfigService } from '@nestjs/config/dist/config.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: DatabaseService,
        private jwt: JwtService,
        private config: ConfigService,
    ) {}
    @HttpCode(200)
    async signin(dto: AuthDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        if (!user) {
            throw new ForbiddenException('Credintials incorrect');
        }
        const pwMatches = argon.verify(user.hash, dto.password);
        if (!pwMatches) {
            throw new ForbiddenException('Credintials incorrect');
        }

        return this.signToken(user.id, user.email);
    }
    async signup(dto: AuthDto) {
        const hash = await argon.hash(dto.password);
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash: hash,
                },
            });
            return this.signToken(user.id, user.email);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code == 'P2002') {
                    throw new ForbiddenException('Credentials are taken');
                }
            }
            throw error;
        }
    }

    async signToken(
        userId: number,
        email: string,
    ): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email,
        };
        const JWT_SECRET = this.config.get('JWT_SECRET');
        const token = this.jwt.sign(payload, {
            expiresIn: '15m',
            secret: JWT_SECRET,
        });

        return {
            access_token: token,
        };
    }
}
