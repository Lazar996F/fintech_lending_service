import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      return this.authService.signUp(email, password);
    } catch (e) {
      return { message: 'Failed to sign up', error: e.message };
    }
  }
}
