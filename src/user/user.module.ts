import { Module } from '@nestjs/common';
import { databaseProviders } from 'src/core/database/database.providers';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { userProviders } from './user.providers';

@Module({
  controllers: [UserController],
  providers: [UserService, ...databaseProviders, ...userProviders],
})
export class UserModule {}
