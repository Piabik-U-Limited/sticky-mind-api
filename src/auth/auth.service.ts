import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserDto } from './dto/user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtTokenService } from './jwt/jwt-token.service';
import { ConfigService } from '@nestjs/config';
import * as speakeasy from 'speakeasy';

import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaClient,
    private jwt: JwtTokenService,
    private config: ConfigService,
  ) {}

  async signUp(dto: UserDto) {
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        //username: dto.username,
      },
    });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await this.createHash(dto.password, salt);
    const password = await this.prisma.password.create({
      data: {
        hash: hashedPassword,
        userId: user.id,
        salt: salt,
      },
    });

    const verificationToken = crypto.randomBytes(20).toString('hex');
    const otp = this.otpService.generateOtp();
    await this.storeOtp(user.id, otp);
    await this.storeToken(user.id, verificationToken);
    return {
      message: 'Account created successfully',
      user: user,
      tokens: await this.jwt.signTokens(user.id, dto.email, dto.password),
    };
  }

  async loginUser(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new NotFoundException('Email address does not exist');

    if (!user) throw new NotFoundException('Invalid Credentials');
    const password = await this.prisma.password.findUnique({
      where: { userId: user.id },
    });
    if (!password)
      return new HttpException(
        {
          message: 'You need to set a password',
          user,
        },
        HttpStatus.CONTINUE,
      );
    const passwordMatch = await bcrypt.compare(dto.password, password.hash);
    if (!passwordMatch) throw new NotFoundException('Invalid Password');
    return {
      message: 'Login successful',
      user: user,
      tokens: await this.jwt.signTokens(user.id, dto.email, dto.password),
    };
  }

  private async createHash(password: string, salt: string) {
    return await bcrypt.hash(password, salt); // Hash the password with the salt
  }
  private async storeOtp(userId: string, code: string) {
    return await this.prisma.otp.create({
      data: { code, userId },
    });
  }
  private async storeToken(userId: string, token: string) {
    return await this.prisma.token.create({
      data: {
        user: { connect: { id: userId } },
        token,
      },
    });
  }
  private generateOtp() {
    const otp = speakeasy.totp({
      secret: this.config.get('APP_SECRET'),
      encoding: 'base32',
      digits: 6,
    });

    return otp;
  }
}
