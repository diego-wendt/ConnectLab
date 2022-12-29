/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './core/auth/guards/strategy/jwt.strategy';
require('dotenv-flow').config();
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    //
    //POR ALGUM MOTIVO QUE NÃO IDENTIFIQUEI ISSO NÃO ESTÁ FUNCIONANDO
    //
    // JwtModule.register({
    //   secret: 'jb2KURr1O89JjfcvCPIZkh3qQQ',
    //   signOptions: {
    //     expiresIn: 60 * 6,
    //   },
    // }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
