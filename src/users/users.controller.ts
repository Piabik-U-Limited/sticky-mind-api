import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Put,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserDto } from '../auth/dto/user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
@ApiTags('Users')
@ApiBearerAuth()
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all users',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  async getUsers() {
    return await this.usersService.getUsers();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get user by id',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  async getUserById(@Param('id') id: string) {
    return await this.usersService.getUserById(id);
  }

  @Delete('/:id')
  @ApiResponse({
    status: 200,
    description: 'Delete user by id',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.deleteUser(id);
  }

  //edit
  @Patch('/:id')
  @ApiResponse({
    status: 200,
    description: 'Edit user by id',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  async editUserField(
    @Param('id') id: string,
    @Param('field') field: string,
    @Body() dto: UserDto,
  ) {
    return await this.usersService.editUserField(id, field, dto[field]);
  }
}
