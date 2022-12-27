import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async create(@Body() createUser: CreateUserDto) {
    try {
      const user = await this.authService.createUser(createUser);
      return user;
    } catch (error) {
      return error;
    }
  }
}
