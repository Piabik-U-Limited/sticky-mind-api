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
import { DashboardService } from './dashboard.service';
import {
  ApiTags,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { JwtTokenService } from '../auth/jwt/jwt-token.service';
import { AuthGuard } from '@nestjs/passport';
@Controller('dashboard')
@ApiTags('Dashboard')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class DashboardController {
  constructor(
    private dashboardService: DashboardService,
    private jwt: JwtTokenService,
  ) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all dashboard data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not found' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getDashboardData(@Req() request) {
    const token = request.headers.authorization?.split(' ')[1];
    const userId = await this.jwt.getUserIdFromToken(token);
    return await this.dashboardService.getDashboardData(userId);
  }
}
