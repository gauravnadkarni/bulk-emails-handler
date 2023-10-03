import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { User as UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
    constructor( @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ){}

    async findByEmail(email: string): Promise<UserDto> {
        const userEntity:UserEntity = await this.userRepository.findOne({where:{email}});
        if(!userEntity) {
            return userEntity;
        }
        return UserDto.fromEntity(userEntity);
      }

    async findByUserId(userId: string): Promise<UserDto> {
        const userEntity:UserEntity = await this.userRepository.findOne({where:{userId}});
        if(!userEntity) {
            return userEntity;
        }
        return UserDto.fromEntity(userEntity);
      }
}
