import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dto/create_user.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesEnum } from 'src/utils/enums/roles.enum';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // POST METHODS //

  // @Auth(RolesEnum.ADMIN)
  @Post('/createUser')
  async transformGenderNumber(@Body() newUserDto: CreateUserDto) {
    return await this.usersService.createUser(newUserDto);
  }

  // GET METHODS //

  @Auth(RolesEnum.ADMIN)
  @Get('/getAll')
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  @Auth(RolesEnum.ADMIN)
  @Get('/getUser/:id')
  async getUsersById(@Param('id') id: string) {
    return await this.usersService.getUsersById(id);
  }

  // PATCH METHODS //

  @Auth(RolesEnum.ADMIN)
  @Patch('/updatePassword/:id')
  async updateUserPassword() {
    return await this.usersService.updateUserPassword();
  }
}
