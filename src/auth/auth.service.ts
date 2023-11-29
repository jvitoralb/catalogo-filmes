import { randomBytes, pbkdf2Sync } from 'node:crypto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../users/user.dto';
import { UserService } from '../users/user.service';
import { PasswordConfig } from '../types';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async authUserSignup(newUserAuth: UserDto) {
        const pswdConfig: PasswordConfig = this.passwordConfig(newUserAuth.password);

        const savedUser = await this.userService.create(newUserAuth, pswdConfig);
        const payload = {
            sub: savedUser.id,
            email: savedUser.email 
        }

        const token: string = await this.jwtService.signAsync(payload);

        return {
            accessToken: token
        }
    }
    async authUserLogin(userAuth: UserDto) {
        const targetUser = await this.userService.findOne(userAuth);
        const pswdValidation = this.passwordValidate(userAuth.password, targetUser.password, targetUser.salt);

        if (!pswdValidation) {
            throw new BadRequestException('Wrong password');
        }

        const payload = {
            sub: targetUser.id,
            email: targetUser.email 
        }

        const token: string = await this.jwtService.signAsync(payload);

        return {
            accessToken: token
        }
    }

    private passwordValidate(password: string, hash: string, salt: string) {
        const verify = pbkdf2Sync(password, salt, 20000, 64, 'sha512').toString('hex');

        if (verify === hash) {
            return true;
        }
        return false;
    }
    private passwordConfig(password: string): PasswordConfig {
        const salt = randomBytes(32).toString('hex');
        const hash = pbkdf2Sync(password, salt, 20000, 64, 'sha512').toString('hex');

        return {
            hash,
            salt
        }
    }
}