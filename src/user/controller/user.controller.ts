import { Controller, Body, Post } from '@nestjs/common';
import { CredentialsDto } from 'src/auth/dto/credentials.dto';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('data')
  async getData(@Body() CredentialsDto: CredentialsDto) {
    return await this.userService.getData(CredentialsDto);
  }
}
