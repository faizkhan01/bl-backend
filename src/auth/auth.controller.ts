import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    return this.authService.signup({
      email: dto.email,
      password: dto.password,
      roles: dto.roles,
      firstName: dto.firstName,
      lastName: dto.lastName,
    });
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto.email, dto.password);
  }
}


