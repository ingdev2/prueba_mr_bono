import {
  HttpException,
  HttpStatus,
  Injectable,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/role/entities/role.entity';

import { JwtService } from '@nestjs/jwt';

import { Payload } from '../interfaces/payload.interface';
import { Tokens } from '../interfaces/tokens.interface';
import { IUser } from 'src/utils/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,

    private readonly jwtService: JwtService,
  ) {}

  private getExpirationInSeconds(expiresIn: string): number {
    const expiresInInSeconds = parseInt(expiresIn, 10) * 60;

    return expiresInInSeconds;
  }

  private async generateTokens(user: Partial<IUser>): Promise<Tokens> {
    const jwtUserPayload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const [accessToken, refreshToken, accessTokenExpiresIn] = await Promise.all(
      [
        await this.jwtService.signAsync(jwtUserPayload, {
          secret: process.env.JWT_CONSTANTS_SECRET,
          expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
        }),

        await this.jwtService.signAsync(jwtUserPayload, {
          secret: process.env.JWT_CONSTANTS_SECRET,
          expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
        }),

        await this.getExpirationInSeconds(process.env.ACCESS_TOKEN_EXPIRES_IN),
      ],
    );

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      access_token_expires_in: accessTokenExpiresIn,
    };
  }

  async refreshToken(refreshToken: string): Promise<any> {
    try {
      const user: IUser = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_CONSTANTS_SECRET,
      });

      const payload: Payload = {
        sub: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      const { access_token, refresh_token, access_token_expires_in } =
        await this.generateTokens(payload);

      return {
        access_token,
        refresh_token,
        access_token_expires_in,
        status: HttpStatus.CREATED,
        message: '¡Refresh Token Successfully!',
      };
    } catch (error) {
      throw new UnauthorizedException(`¡Refresh Token Failed!`);
    }
  }
}
