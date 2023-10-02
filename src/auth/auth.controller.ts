import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { GoogleOAuthGuard } from './guard';

//Entender como usar o google aqui

@Controller('auth')
export class AuthController {
    constructor(private readonly AuthService: AuthService) {}
    @Post('signin')
    signin(@Body() dto: AuthDto) {
        return this.AuthService.signin(dto);
    }

    @Post('signup')
    signup(@Body() dto: AuthDto) {
        return this.AuthService.signup(dto);
    }
    @Get('signin/google')
    @UseGuards(GoogleOAuthGuard)
    async googleAuth(@Request() req) {}
  
    @Get('google-redirect')
    @UseGuards(GoogleOAuthGuard)
    googleAuthRedirect(@Request() req) {
      return this.AuthService.googleLogin(req);
    }
}
