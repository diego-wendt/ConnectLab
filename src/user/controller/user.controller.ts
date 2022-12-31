import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  HttpStatus,
  HttpCode,
  Query,
} from '@nestjs/common';
import { DeviceService } from 'src/device/services/device.service';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private deviceService: UserService) {}

  @Post(':id/addDevice')
  async addDevice(@Body() devices: any, @Param('id') id: any) {
    // await this.deviceService.create(devices, id);
  }
}
