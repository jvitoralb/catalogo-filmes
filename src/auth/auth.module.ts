import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module';

@Module({
    imports: [
        JwtModule.registerAsync({
            global: true,
            useFactory: () => ({
                secret: process.env.KEY_PRIV,
                signOptions: {
                    expiresIn: '60s',
                    algorithm: 'RS256'
                },
            })
        }),
        UserModule,
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule { }
