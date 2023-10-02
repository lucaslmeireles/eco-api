import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { GoogleOAuthGuard } from './guard';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [JwtModule.register({
        
    }), PassportModule],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, GoogleOAuthGuard],
})
export class AuthModule {}
