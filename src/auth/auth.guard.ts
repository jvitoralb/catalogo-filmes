import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC } from '../common/constants/constants';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly reflector: Reflector
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        const req: Request = context.switchToHttp().getRequest();
        const token = this.getAuthToken(req);

        if (!token) {
            throw new UnauthorizedException('Authorization token is required');
        }

        try {
            const payload = await this.jwtService.verifyAsync(token);
            req['user'] = payload;
            return true;
        } catch {
            throw new UnauthorizedException();
        }
    }

    private getAuthToken(req: Request) {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return undefined;
        }

        const [type, token] = authorization.split(' ');

        return type === 'Bearer' ? token : undefined;
    }
}