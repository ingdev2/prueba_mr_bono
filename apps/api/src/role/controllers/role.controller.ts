import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RolesEnum } from 'src/utils/enums/roles.enum';

@ApiTags('role')
@ApiBearerAuth()
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // POST METHODS //

  // @Auth(RolesEnum.ADMIN)
  @Post('/create')
  createRole(@Body() createRole: CreateRoleDto) {
    return this.roleService.createRole(createRole);
  }

  // GET METHODS //

  @Get('/getAll')
  getAllRoles() {
    return this.roleService.getAllRoles();
  }

  @Get('/getRole/:id')
  getRoleById(@Param('id') id: number) {
    return this.roleService.getRoleById(id);
  }

  // PATCH METHODS //

  @Auth(RolesEnum.ADMIN)
  @Patch('/update/:id')
  updateRole(@Param('id') id: number, @Body() updateRole: UpdateRoleDto) {
    return this.roleService.updateRole(id, updateRole);
  }
}
