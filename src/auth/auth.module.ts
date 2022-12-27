import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { databaseProviders } from 'src/core/database/database.providers';
import { userProviders } from 'src/user/user.providers';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
  imports: [UserEntity],
  controllers: [AuthController],
  providers: [AuthService, ...databaseProviders, ...userProviders],
})
export class AuthModule {}
