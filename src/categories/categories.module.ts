import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenService } from '../auth/jwt/jwt-token.service';
import { ConfigService } from '@nestjs/config';
@Module({
  providers: [
    CategoriesService,
    PrismaClient,
    JwtService,
    JwtTokenService,
    ConfigService,
  ],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
