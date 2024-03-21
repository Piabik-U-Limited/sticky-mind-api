import { Controller, Get, Param, Post, Body, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskDto } from './dto/task.dto';
import {
  ApiTags,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { JwtTokenService } from '../auth/jwt/jwt-token.service';
@Controller('tasks')
@ApiTags('Tasks')
export class TasksController {
  constructor(
    private tasksService: TasksService,
    private jwt: JwtTokenService,
  ) {}

  //add task
  @Post()
  @ApiBearerAuth()
  @ApiBody({ type: TaskDto })
  @ApiResponse({ status: 201, description: 'Task created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async addTask(
    @Req() request,

    @Body() dto: TaskDto,
  ) {
    const token = request.headers.authorization?.split(' ')[1];
    const userId = await this.jwt.getUserIdFromToken(token);
    return await this.tasksService.addTask(dto, userId);
  }

  @Get('/:userId')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Get all tasks' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getTasks(@Param('userId') userId: string) {
    return await this.tasksService.getTasks(userId);
  }
}
