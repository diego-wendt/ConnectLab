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
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { ApiOperations } from 'src/utils/api.operation';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserService } from '../service/user.service';

@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOperation(ApiOperations.Users.getUser.ApiOperation)
  @ApiResponse({
    status: 200,
    description: 'Operação realizada com sucesso',
  })
  async getUser(@Request() request) {
    const { user } = request;
    try {
      return await this.userService.getUser(user);
    } catch (error) {
      throw new HttpException(error.detail, error.code);
    }
  }

  @Put()
  @ApiOperation(ApiOperations.Users.updateUser.ApiOperation)
  @ApiResponse({
    status: 201,
    description: 'Usuário atualizado com sucesso',
  })
  async updateUser(@Body() updateUser: UpdateUserDto, @Request() request) {
    const { user } = request;
    try {
      return await this.userService.updateUser(updateUser, user);
    } catch (error) {
      throw new HttpException(error.detail, error.code);
    }
  }

  @HttpCode(204)
  @Delete()
  @ApiOperation(ApiOperations.Users.deleteUser.ApiOperation)
  @ApiResponse({
    status: 204,
    description: 'Usuário removido com sucesso',
  })
  async deleteUser(@Request() request) {
    const { user } = request;
    try {
      return await this.userService.deleteUser(user);
    } catch (error) {
      if (error.code === 404) {
        throw new HttpException(error.detail, HttpStatus.OK);
      }
      throw new HttpException(error.detail, error.code);
    }
  }
}
