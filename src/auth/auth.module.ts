import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { DatabaseProviders } from 'src/core/database/database.providers';
import { UserProviders } from 'src/user/user.providers';
import { UserEntity } from 'src/user/entities/user.entity';
import { JwtStrategy } from 'src/core/auth/guards/strategy/jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UserEntity, PassportModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    JwtStrategy,
    ...DatabaseProviders,
    ...UserProviders,
  ],
  exports: [AuthService],
})
export class AuthModule {}
