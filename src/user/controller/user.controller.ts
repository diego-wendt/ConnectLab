import {
  Controller,
  Body,
  Post,
  Delete,
  HttpException,
  UseGuards,
  Request,
  Put,
  Get,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserService } from '../service/user.service';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getUser(@Request() request) {
    const { user } = request;
    try {
      return await this.userService.getUser(user);
    } catch (error) {
      throw new HttpException(error.detail, error.code);
    }
  }

  @Put()
  async updateUser(@Body() updateUser: UpdateUserDto, @Request() request) {
    const { user } = request;
    try {
      return await this.userService.updateUser(updateUser, user);
    } catch (error) {
      throw new HttpException(error.detail, error.code);
    }
  }

  @Delete()
  async deleteUser(@Request() request) {
    const { user } = request;
    try {
      return await this.userService.deleteUser(user);
    } catch (error) {
      throw new HttpException(error.detail, error.code);
    }
  }
}
