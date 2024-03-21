import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UserDto } from '../auth/dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiKeyGuard } from '../auth/guards/apikey.guard';
@Controller('users')
@UseGuards(AuthGuard('jwt'))
@ApiTags('Users')
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

  @Post('delete/:id')
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
  @Post('edit/:id')
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
