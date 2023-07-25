import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

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
}
