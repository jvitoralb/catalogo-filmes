import { join } from 'node:path';
import { readFileSync } from 'node:fs';
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
                privateKey: process.env.KEY_PRIV,
                publicKey: readFileSync(join(process.cwd(), 'key.pub')).toString(),
                signOptions: {
                    expiresIn: '7d',
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
