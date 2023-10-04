import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import Utility from '../utility/utility';
import { User } from '../users/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { jwtConstants } from './constants';
import { Tokens } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService:JwtService,
    private configService:ConfigService,
  ) {}

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

  async getUserDetailsById(userId: string): Promise<any> {
    const user:User = await this.usersService.findByUserId(userId);
    if (!user) {
      throw new NotFoundException("Unable to find the user");;
    }
    
    const { password:hashedPassword, ...plainUserWithoutPassword } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return plainUserWithoutPassword;
  }

  async signin(user: User):Promise<Tokens>{
    const payload = { sub: user.userId, name: user.name };
    const accessTokenPrivateKey = jwtConstants.secretForAccessToken;
    const refreshTokenPrivateKey = jwtConstants.secretForRefreshToken;
    const accessTokenExpiresIn = this.configService.get("APP.EXPIRES_IN_TIME_FOR_ACCESS_TOKEN_IN_SECONDS","900s")
    const refreshTokenExpiresIn = this.configService.get("APP.EXPIRES_IN_TIME_FOR_REFRESH_TOKEN_IN_DAYS","60d")
    return {
      access_token: this.jwtService.sign(payload,{expiresIn: `${accessTokenExpiresIn}s`, secret: accessTokenPrivateKey}),
      refresh_token: this.jwtService.sign(payload, {expiresIn: `${refreshTokenExpiresIn}d`, secret: refreshTokenPrivateKey})
    };
  }

  async refresh(user: User):Promise<Tokens> {
    const payload = { sub: user.userId, name: user.name };
    const accessTokenPrivateKey = jwtConstants.secretForAccessToken;
    const refreshTokenPrivateKey = jwtConstants.secretForRefreshToken;
    const accessTokenExpiresIn = this.configService.get("APP.EXPIRES_IN_TIME_FOR_ACCESS_TOKEN_IN_SECONDS","900s")
    const refreshTokenExpiresIn = this.configService.get("APP.EXPIRES_IN_TIME_FOR_REFRESH_TOKEN_IN_DAYS","60d")
    return {
      access_token: this.jwtService.sign(payload,{expiresIn: `${accessTokenExpiresIn}s`, secret: accessTokenPrivateKey}),
      refresh_token: this.jwtService.sign(payload, {expiresIn: `${refreshTokenExpiresIn}d`, secret: refreshTokenPrivateKey})
    };
  }
}
