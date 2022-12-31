import { Module } from '@nestjs/common';
import { DeviceService } from './services/device.service';
import { DeviceController } from './controller/device.controller';
import { databaseProviders } from 'src/core/database/database.providers';
import { deviceProviders } from './device.providers';

@Module({
  controllers: [DeviceController],
  providers: [DeviceService, ...databaseProviders, ...deviceProviders],
})
export class DeviceModule {}
