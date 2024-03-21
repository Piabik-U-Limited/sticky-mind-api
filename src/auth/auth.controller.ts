import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
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
  async signUp(@Body() dto: UserDto) {
    return this.authService.signUp(dto);
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
