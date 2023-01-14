import { Module } from '@nestjs/common';
import { DeviceService } from './services/device.service';
import { DeviceController } from './controller/device.controller';
import { databaseProviders } from 'src/core/database/database.providers';
import { deviceProviders } from './device.providers';
import { userProviders } from 'src/user/user.providers';
import { DeviceUtils } from './utils/device.utils';
import { UserService } from 'src/user/service/user.service';

@Module({
  controllers: [DeviceController],
  providers: [
    DeviceUtils,
    DeviceService,
    ...databaseProviders,
    ...deviceProviders,
    ...userProviders,
    UserService,
  ],
})
export class DeviceModule {}
