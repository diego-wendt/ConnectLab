import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { databaseProviders } from 'src/core/database/database.providers';
import { userProviders } from 'src/user/user.providers';
import { UserEntity } from 'src/user/entities/user.entity';
import { JwtStrategy } from 'src/core/auth/guards/strategy/jwt.strategy';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserEntity],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    JwtStrategy,
    ...databaseProviders,
    ...userProviders,
  ],
})
export class AuthModule {}
