import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateDeviceDto } from '../dto/create-device.dto';
import { DeviceService } from '../services/device.service';

@Controller('devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post('models')
  async createModels() {
    return await this.deviceService.createModels();
  }

  @Post()
  async createDevice(@Body() createDeviceDto: CreateDeviceDto) {
    return await this.deviceService.create(createDeviceDto);
  }

  @Get()
  async findAll() {
    return await this.deviceService.findAll();
  }
}
