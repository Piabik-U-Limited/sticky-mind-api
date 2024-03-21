import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaClient } from '@prisma/client';
import { JwtTokenService } from './jwt/jwt-token.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
//auth
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.APP_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    AuthService,
    PrismaClient,
    JwtService,
    JwtTokenService,
    ConfigService,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
