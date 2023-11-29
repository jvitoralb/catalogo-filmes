import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from '../users/user.dto';
import { AuthService } from './auth.service';
import { Public } from '../common/decorators/public.decorator';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('/auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly service: AuthService
    ) { }

    @Public()
    @Post('signup')
    @ApiCreatedResponse({ description: 'Cria um novo usuário e responde com um token para ser usado como authorization header nos request em /movies' })
    @ApiBadRequestResponse({ description: 'Caso falte propriedades no body ou caso o email já esteja cadastrado' })
    createUserAuth(@Body() newUserAuth: UserDto) {
        return this.service.authUserSignup(newUserAuth);
    }

    @Public()
    @Post('login')
    @ApiCreatedResponse({ description: 'Retorna um token para ser usado como authorization header nos request em /movies' })
    @ApiBadRequestResponse({ description: 'Caso falte propriedades no body ou o email do usuário não está cadastrado' })
    postUserAuth(@Body() userAuth: UserDto) {
        return this.service.authUserLogin(userAuth);
    }
}