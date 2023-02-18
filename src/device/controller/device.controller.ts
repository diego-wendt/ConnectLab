import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { CreateDeviceDto } from '../dto/create-device.dto';
import { IdDeviceDto } from '../dto/id-device.dto';
import { PlaceDto } from '../dto/place-dto';
import { DeviceService } from '../services/device.service';

@ApiTags('Devices')
@UseGuards(JwtAuthGuard)
@Controller('devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get('models')
  @ApiResponse({
    status: 200,
    description: 'Operação realizada com sucesso',
  })
  async findAllModels() {
    try {
      return await this.deviceService.findAllModels();
    } catch (error) {
      throw new HttpException(error.detail, error.code);
    }
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Dispositivo cadastrado com sucesso',
  })
  async createDevice(
    @Body() createDeviceDto: CreateDeviceDto,
    @Request() request,
  ) {
    const { user } = request;
    try {
      return await this.deviceService.create(createDeviceDto, user);
    } catch (error) {
      throw new HttpException(error.detail, error.code);
    }
  }

  @Get('places')
  @ApiResponse({
    status: 200,
    description: 'Operação realizada com sucesso',
  })
  async getPlaces() {
    return await this.deviceService.getPlaces();
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Operação realizada com sucesso',
  })
  async listUserDevices(@Request() request, @Query() query: PlaceDto) {
    const { user } = request;
    try {
      return await this.deviceService.listUserDevices(user, query);
    } catch (error) {
      throw new HttpException(error.detail, error.code);
    }
  }

  @Get('device')
  @ApiResponse({
    status: 200,
    description: 'Operação realizada com sucesso',
  })
  async findDevice(@Request() request, @Body() device: IdDeviceDto) {
    const { user } = request;
    const relation = { model: true };
    try {
      return await this.deviceService.findDevice(device, user, relation);
    } catch (error) {
      throw new HttpException(error.detail, error.code);
    }
  }

  @Patch()
  @ApiResponse({
    status: 200,
    description: 'Operação realizada com sucesso',
  })
  async switchDevice(@Body() device: IdDeviceDto, @Request() request) {
    const { user } = request;
    try {
      return await this.deviceService.switchDevice(device, user);
    } catch (error) {
      throw new HttpException(error.detail, error.code);
    }
  }

  @Delete()
  @ApiResponse({
    status: 204,
    description: 'Operação realizada com sucesso',
  })
  async deleteDevice(@Body() device: IdDeviceDto, @Request() request) {
    const { user } = request;
    try {
      return await this.deviceService.deleteDevice(device, user);
    } catch (error) {
      throw new HttpException(error.detail, error.code);
    }
  }
}
