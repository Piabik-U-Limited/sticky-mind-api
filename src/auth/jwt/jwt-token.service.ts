import { Injectable, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtTokenService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async signTokens(userId: string, email: string, password: string) {
    const [at, rt] = await Promise.all([
      this.jwt.signAsync(
        {
          userId,
          email,
          password,
        },
        {
          secret: this.config.get('APP_SECRET'),
          expiresIn: '1d',
        },
      ),
      this.jwt.signAsync(
        {
          userId,
          email,
          password,
        },
        {
          secret: this.config.get('APP_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
  verifyToken(token: string) {
    try {
      const decoded = this.jwt.verify(token, this.config.get('APP_SECRET'));
      return decoded;
    } catch (error) {
      // If the token is invalid or has expired, an exception will be thrown
      throw new ForbiddenException('Invalid token');
    }
  }

  async getUserIdFromToken(token: string): Promise<string> {
    try {
      const decoded = this.jwt.decode(token);
      if (decoded && typeof decoded === 'object' && 'userId' in decoded) {
        return decoded.userId;
      }
      throw new Error('User ID not found in token');
    } catch (error) {
      throw new Error('User not verified ');
    }
  }
}
