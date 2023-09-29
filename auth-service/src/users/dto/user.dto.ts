import {User as UserEntity} from '../entities/user.entity';

export class User {
    userId: string;
    email: string;
    password?:string;
    name: string;

    static fromEntity(userEntity:UserEntity):User {
        const user:User = new User();
        user.userId = userEntity.userId;
        user.email = userEntity.email;
        user.password = userEntity.password;
        user.name = userEntity.name;
        return user;
    }

    static toEntity(userDto:User):UserEntity {
        const userEntity:UserEntity = new UserEntity();
        userEntity.userId = userDto.userId;
        userEntity.email = userDto.email;
        userEntity.password = userDto.password;
        userEntity.name = userDto.name;
        return userEntity;
    }
}