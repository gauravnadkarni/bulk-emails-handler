import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import Utility from 'src/utility/utility';
import { User } from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(email: string, plainPassword: string): Promise<any> {
    const user:User = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException("Unauthorized!!");
    }
    const passCheck = Utility.checkBcryptHash(plainPassword,user.password);
    if(!passCheck) {
        throw new UnauthorizedException("Invalid credentials supplied");
    }

    const { password:hashedPassword, ...plainUser } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return plainUser;
  }
}
