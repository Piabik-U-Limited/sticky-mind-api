import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OtpDto, UserDto } from './dto/user.dto';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { EmailGuard } from './guards/email.guard';
import { PhoneGuard } from './guards/phone.guard';
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiBody({ type: UserDto })
  @ApiResponse({
    status: 201,
    description: 'Account created successfully',
  })
  @UseGuards(EmailGuard, PhoneGuard)
  async signUp(@Body() dto: UserDto) {
    return this.authService.signUp(dto);
  }

  //verify email address
  @Post('/verify')
  @ApiBody({
    type: OtpDto,
  })
  @ApiResponse({ status: 200, description: 'Email verified successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async verifyEmail(@Body() dto: OtpDto) {
    return this.authService.verifyAccount(dto);
  }

  //verify With links
  @Get('verify/:token')
  @ApiResponse({ status: 200, description: 'Email verified successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async verifyWithLink(@Param('token') token: string) {
    return this.authService.verifyWithLink(token);
  }
  @Post('login')
  @ApiBody({
    type: LoginDto,
  })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async login(@Body() dto: LoginDto) {
    return this.authService.loginUser(dto);
  }
}
