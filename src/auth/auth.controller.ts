import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly AuthService: AuthService) {}
    @Post('signin')
    signin() {
        return this.AuthService.signin();
    }

    @Post('signup')
    signup(@Body() dto: AuthDto) {
        console.log(dto);
        return this.AuthService.signup(dto);
    }
}
