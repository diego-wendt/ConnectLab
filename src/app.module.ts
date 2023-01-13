/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './core/auth/guards/strategy/jwt.strategy';
import { DeviceModule } from './device/device.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
require('dotenv-flow').config();
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    // JwtModule.register({
    //   secret: 'jb2KURr1O89JjfcvCPIZkh3qQQ',
    //   signOptions: {
    //     expiresIn: 60 * 6,
    //   },
    // }),
    // PassportModule,
    UserModule,
    AuthModule,
    DeviceModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
