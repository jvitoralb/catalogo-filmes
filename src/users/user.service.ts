import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { User } from './user.entity';
import { PasswordConfig } from '../types';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
    ) { }

    async create(newUser: UserDto, pswdConfig: PasswordConfig): Promise<User> {
        try {
            return await this.repository.save({
                email: newUser.email,
                password: pswdConfig.hash,
                salt: pswdConfig.salt
            });
        } catch (e) {
            if (e instanceof QueryFailedError) {
                if (e.driverError.code === '23505') {
                    throw new BadRequestException('Email already exists');
                }
            }
        }
    }
    async findOne(user: UserDto): Promise<User> {
        const targetUser = await this.repository.findOne({
            where: {
                email: user.email
            }
        });

        if (!targetUser) {
            throw new BadRequestException('User email does not exists');
        }

        return targetUser;
    }
}