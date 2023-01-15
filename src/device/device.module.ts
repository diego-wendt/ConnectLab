import { Module } from '@nestjs/common';
import { DeviceService } from './services/device.service';
import { DeviceController } from './controller/device.controller';
import { DatabaseProviders } from 'src/core/database/database.providers';
import { DeviceProviders } from './device.providers';
import { UserProviders } from 'src/user/user.providers';
import { DeviceUtils } from './utils/device.utils';
import { UserService } from 'src/user/service/user.service';

@Module({
  controllers: [DeviceController],
  providers: [
    DeviceUtils,
    DeviceService,
    ...DatabaseProviders,
    ...DeviceProviders,
    ...UserProviders,
    UserService,
  ],
})
export class DeviceModule {}
