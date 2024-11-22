import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 201,
    description:
      'If you get 201 response then user has been created successfully',
  })
  @ApiOperation({ summary: 'User signup' })
  @Post('/signup')
  create(@Body() createAuthDto: SignUpDto) {
    return this.authService.create(createAuthDto);
  }

  @ApiResponse({
    status: 201,
    description:
      'If you get 201 response then user has been login successfully',
  })
  @ApiOperation({ summary: 'User login' })
  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
