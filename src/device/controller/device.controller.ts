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
import { JwtAuthGuard } from 'src/core/auth/guards/jwt-auth.guard';
import { CreateDeviceDto } from '../dto/create-device.dto';
import { IdDeviceDto } from '../dto/id-device.dto';
import { PlaceDto } from '../dto/place-dto';
import { DeviceService } from '../services/device.service';

@UseGuards(JwtAuthGuard)
@Controller('devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get('models')
  async findAllModels() {
    try {
      return await this.deviceService.findAllModels();
    } catch (error) {
      throw new HttpException(error.detail, error.code);
    }
  }

  @Post()
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
  async getPlaces() {
    return await this.deviceService.getPlaces();
  }

  @Get()
  async listUserDevices(@Request() request, @Query() query: PlaceDto) {
    const { user } = request;
    try {
      return await this.deviceService.listUserDevices(user, query);
    } catch (error) {
      throw new HttpException(error.detail, error.code);
    }
  }

  @Get('device')
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
  async switchDevice(@Body() device: IdDeviceDto, @Request() request) {
    const { user } = request;
    try {
      return await this.deviceService.switchDevice(device, user);
    } catch (error) {
      throw new HttpException(error.detail, error.code);
    }
  }

  @Delete()
  async deleteDevice(@Body() device: IdDeviceDto, @Request() request) {
    const { user } = request;
    try {
      return await this.deviceService.deleteDevice(device, user);
    } catch (error) {
      throw new HttpException(error.detail, error.code);
    }
  }
}
