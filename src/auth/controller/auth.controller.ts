import {
  Body,
  Controller,
  Post,
  HttpException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { ChangePasswordDto } from 'src/auth/dto/change_password.dto';
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
      return { message: 'User sucefully created.' };
    } catch (error) {
      if (error.code == 23505)
        throw new HttpException('User already registered.', 409);
    }
  }

  @Post('signin')
  async signin(@Body() credentialsDto: CredentialsDto) {
    try {
      const token = await this.authService.signin(credentialsDto);
      return { token };
    } catch (error) {
      throw new HttpException(error.message, error.code);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('changepassword')
  async changePassword(
    @Body() changePasswordtDto: ChangePasswordDto,
    @Request() request,
  ) {
    const { user } = request;
    try {
      return await this.authService.changePassword(changePasswordtDto, user);
    } catch (error) {
      throw new HttpException(error.detail, error.code);
    }
  }
}
