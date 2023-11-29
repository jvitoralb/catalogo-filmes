import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
        return await this.repository.save({
            email: newUser.email,
            password: pswdConfig.hash,
            salt: pswdConfig.salt
        });
    }
    async findOne(user: UserDto): Promise<User> {
        return await this.repository.findOne({
            where: {
                email: user.email
            }
        });
    }
}