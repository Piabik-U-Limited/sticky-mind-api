import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { PrismaClient } from '@prisma/client';
import { JwtTokenService } from '../auth/jwt/jwt-token.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    NotesService,
    PrismaClient,
    JwtService,
    JwtTokenService,
    ConfigService,
  ],
  controllers: [NotesController],
})
export class NotesModule {}
