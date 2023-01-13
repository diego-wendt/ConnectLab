import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { databaseProviders } from 'src/core/database/database.providers';
import { userProviders } from 'src/user/user.providers';
import { UserEntity } from 'src/user/entities/user.entity';
import { JwtStrategy } from 'src/core/auth/guards/strategy/jwt.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UserEntity,
    PassportModule,
    JwtModule.register({
      secret: 'jb2KURr1O89JjfcvCPIZkh3qQQ',
      signOptions: {
        expiresIn: 60 * 6,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    JwtStrategy,
    ...databaseProviders,
    ...userProviders,
  ],
  exports: [AuthService],
})
export class AuthModule {}
