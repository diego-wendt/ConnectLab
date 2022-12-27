import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CredentialsDto } from '../dto/credentials.dto';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createUser: CreateUserDto) {
    try {
      const user = await this.authService.createUser(createUser);
      return user;
    } catch (error) {
      return error;
    }
  }

  @Post('signin')
  async signin(@Body() credentialsDto: CredentialsDto) {
    try {
      const credentials = await this.authService.signin(credentialsDto);
      return credentials;
    } catch (error) {
      return 'login não encontrado';
    }
  }
}
