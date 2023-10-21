import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth2';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private prisma: DatabaseService) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/callback/google/redirect',
            scope: ['email', 'profile'],
        });
    }
    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
    ): Promise<any> {
        const { name, emails, photos } = profile;
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken,
            refreshToken,
        };
        try {
            const dbuser = await this.prisma.user.findUniqueOrThrow({
                where: {
                    email: user.email,
                },
            });
            done(null, user);
            delete dbuser.id;
            return dbuser;
        } catch {
            const dbuser = await this.prisma.user.create({
                data: {
                    email: user.email,
                    avatar: user.picture,
                    createAt: new Date(),
                    firstName: user.firstName,
                    lastName: user.lastName,
                    hash: 'google-provider',
                },
            });
            done(null, user);
            delete dbuser.hash;
            return dbuser;
        }
    }
}
