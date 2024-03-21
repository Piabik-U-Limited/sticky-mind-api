import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaClient } from '@prisma/client';
import { JwtTokenService } from './jwt/jwt-token.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    AuthService,
    PrismaClient,
    JwtService,
    JwtTokenService,
    ConfigService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
