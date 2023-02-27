import {
  Body,
  Controller,
  Post,
  HttpException,
  UseGuards,
  Request,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { ChangePasswordDto } from 'src/auth/dto/change_password.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CredentialsDto } from '../dto/credentials.dto';
import { AuthService } from '../service/auth.service';
import { Put } from '@nestjs/common/decorators';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiOperations } from 'src/utils/api.operation';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
  })
  @ApiOperation(ApiOperations.Auth.signup.ApiOperation)
  async signup(@Body() createUser: CreateUserDto) {
    try {
      const user = await this.authService.createUser(createUser);
      return { message: 'User sucefully created.' };
    } catch (error) {
      if (error.code == 23505) {
        throw new HttpException(
          'User already registered.',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(error.detail, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  @ApiOperation(ApiOperations.Auth.signin.ApiOperation)
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso',
  })
  async signin(@Body() credentialsDto: CredentialsDto) {
    try {
      const token = await this.authService.signin(credentialsDto);
      return { token };
    } catch (error) {
      throw new HttpException(error.detail, error.code);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('changepassword')
  @ApiOperation(ApiOperations.Auth.changepassword.ApiOperation)
  @ApiResponse({
    status: 201,
    description: 'Senha atualizada com sucesso',
  })
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
