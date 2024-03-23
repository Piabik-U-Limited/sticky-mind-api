import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Req,
  UseGuards,
  Delete,
  Put,
} from '@nestjs/common';
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
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
@ApiTags('Tasks')
@ApiBearerAuth()
export class TasksController {
  constructor(
    private tasksService: TasksService,
    private jwt: JwtTokenService,
  ) {}

  //add task
  @Post()
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

  @Get()
  @ApiResponse({ status: 200, description: 'Get all tasks' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getTasks(@Req() request) {
    const token = request.headers.authorization?.split(' ')[1];
    const userId = await this.jwt.getUserIdFromToken(token);

    return await this.tasksService.getTasks(userId);
  }
  //get one
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Task retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getTask(@Param('id') id: string) {
    return await this.getTask(id);
  }

  //delete
  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Task deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async deleteTask(@Param('id') id: string) {
    return await this.tasksService.deleteTask(id);
  }

  //edit
  @Put(':id')
  @ApiResponse({ status: 200, description: 'Task deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async edit(@Body() dto: TaskDto, @Param('id') id: string) {
    return await this.tasksService.editTask(id, dto);
  }
  //get pending
  @Get('/pending')
  @ApiResponse({ status: 200, description: 'Task retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getToDoTasks(@Param('id') id: string, @Req() request) {
    const userId = await this.jwt.getUserIdFromToken(
      request.headers.authorization?.split(' ')[1],
    );
    return await this.tasksService.getTodoTasks(userId);
  }

  //get completed
  @Get('/done')
  @ApiResponse({ status: 200, description: 'Task retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getDoneTasks(@Param('id') id: string, @Req() request) {
    const userId = await this.jwt.getUserIdFromToken(
      request.headers.authorization?.split(' ')[1],
    );
    return await this.tasksService.getCompletedTasks(userId);
  }

  //get in progress
  @Get('/running')
  @ApiResponse({ status: 200, description: 'Task retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getInProgressTasks(@Param('id') id: string, @Req() request) {
    const userId = await this.jwt.getUserIdFromToken(
      request.headers.authorization?.split(' ')[1],
    );
    return await this.tasksService.getInProgressTasks(userId);
  }
}
