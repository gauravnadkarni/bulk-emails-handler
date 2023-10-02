import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import Utility from '../utility/utility';
import { User } from '../users/dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService:JwtService) {}

  async validateUser(email: string, plainPassword: string): Promise<any> {
    const user:User = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException("Unauthorized!!");
    }
    const passCheck = await Utility.checkBcryptHash(plainPassword,user.password);
    if(!passCheck) {
        throw new UnauthorizedException("Invalid credentials supplied");
    }

    const { password:hashedPassword, ...plainUserWithoutPassword } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return plainUserWithoutPassword;
  }

  async signin(user: User) {
    const payload = { sub: user.userId, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
