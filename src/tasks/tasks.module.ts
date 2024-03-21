import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { PrismaClient } from '@prisma/client';
import { TasksController } from './tasks.controller';
import { JwtTokenService } from '../auth/jwt/jwt-token.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    TasksService,
    PrismaClient,
    JwtService,
    JwtTokenService,
    ConfigService,
  ],
  controllers: [TasksController],
})
export class TasksModule {}
