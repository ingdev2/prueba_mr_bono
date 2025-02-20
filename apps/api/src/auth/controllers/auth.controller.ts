import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from '../decorators/auth.decorator';

import { CreateUserDto } from 'src/users/dto/create_user.dto';
import { LoginDto } from '../dto/login.dto';
import { PrincipalEmailDto } from '../dto/principal_email.dto';

import { RolesEnum } from 'src/utils/enums/roles.enum';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // LOGIN //

  @Post('refreshToken')
  async refreshToken(@Req() request: Request) {
    const [type, token] = request.headers['authorization']?.split(' ') || [];

    return this.authService.refreshToken(token);
  }
}
