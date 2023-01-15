import { Module } from '@nestjs/common';
import { DatabaseProviders } from 'src/core/database/database.providers';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { UserProviders } from './user.providers';

@Module({
  controllers: [UserController],
  providers: [UserService, ...DatabaseProviders, ...UserProviders],
})
export class UserModule {}
