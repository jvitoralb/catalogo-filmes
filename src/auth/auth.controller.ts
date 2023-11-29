import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from '../users/user.dto';
import { AuthService } from './auth.service';
import { Public } from '../decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly service: AuthService
    ) { }

    @Public()
    @Post('signup')
    createUserAuth(@Body() newUserAuth: UserDto) {
        return this.service.authUserSignup(newUserAuth);
    }

    @Public()
    @Post('login')
    postUserAuth(@Body() userAuth: UserDto) {
        return this.service.authUserLogin(userAuth);
    }
}