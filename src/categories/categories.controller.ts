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
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';
import {
  ApiTags,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { JwtTokenService } from '../auth/jwt/jwt-token.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('categories')
@UseGuards(AuthGuard('jwt'))
@ApiTags('Categories')
@ApiBearerAuth()
export class CategoriesController {
  constructor(
    private categogryService: CategoriesService,
    private jwt: JwtTokenService,
  ) {}

  //add task
  @Post()
  @ApiBody({ type: CategoryDto })
  @ApiResponse({ status: 201, description: 'Task created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async addTask(
    @Req() request,

    @Body() dto: CategoryDto,
  ) {
    const token = request.headers.authorization?.split(' ')[1];
    const userId = await this.jwt.getUserIdFromToken(token);
    console.log(userId);
    return await this.categogryService.addCategory(dto, userId);
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
    // console.log(userId);
    return await this.categogryService.getCategories(userId);
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
    return await this.categogryService.deleteCategory(id);
  }

  //edit
  @Put(':id')
  @ApiResponse({ status: 200, description: 'Task deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async edit(@Body() dto: CategoryDto, @Param('id') id: string) {
    return await this.categogryService.editCategory(id, dto);
  }
}
