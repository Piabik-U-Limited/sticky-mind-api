import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenService } from 'src/auth/jwt/jwt-token.service';
@Module({
  providers: [
    DashboardService,
    PrismaClient,
    ConfigService,
    JwtService,
    JwtTokenService,
  ],
  controllers: [DashboardController],
})
export class DashboardModule {}
