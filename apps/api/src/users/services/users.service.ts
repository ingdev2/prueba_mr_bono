import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create_user.dto';
import { Role } from 'src/role/entities/role.entity';
import { RolesEnum } from 'src/utils/enums/roles.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,

    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  // CREATE FUNTIONS //

  async createUser(newUserDto: CreateUserDto) {
    try {
      const userEmailFound = await this.userRepository.findOne({
        where: {
          email: newUserDto.email,
        },
      });

      if (userEmailFound) {
        throw new HttpException(
          `El correo ${newUserDto.email} ya está registrado.`,
          HttpStatus.CONFLICT,
        );
      }

      const newUserCreated = this.userRepository.create(newUserDto);

      const userRole = await this.roleRepository.findOne({
        where: { name: RolesEnum.USER },
      });

      if (!userRole) {
        throw new HttpException(
          `El role ${RolesEnum.USER} no existe.`,
          HttpStatus.CONFLICT,
        );
      } else {
        newUserCreated.role = [userRole];
      }

      const userCollaboratorSave = await this.userRepository.save(newUserDto);

      return userCollaboratorSave;
    } catch (error) {
      console.log('error', error);
    }
  }

  // GET FUNTIONS //

  async getAllUsers() {
    const allUsers = await this.userRepository.find();

    if (!allUsers) {
      throw new HttpException(
        'No se encontraron usuarios',
        HttpStatus.NOT_FOUND,
      );
    }

    return allUsers;
  }

  async getUsersById(id: string) {
    const oneUser = await this.userRepository.findBy({ id: id });

    if (!oneUser) {
      throw new HttpException(
        'No se encontraron usuarios',
        HttpStatus.NOT_FOUND,
      );
    }

    return oneUser;
  }

  // UPDATE FUNTIONS //

  async updateUser() {}

  async updateUserPassword() {}

  async forgotUserPassword() {}

  async resetUserPassword() {}

  // DELETED-BAN FUNTIONS //

  async banUsers() {}
}
