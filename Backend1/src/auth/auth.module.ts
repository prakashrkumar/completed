import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { HashingProvider } from './provider/hashing.provider';
import { BcryptProvider } from './provider/bcrypt.provider';
import authConfig from './config/auth.config';

@Module({
  providers: [AuthService, {
    provide:HashingProvider,
    useClass:BcryptProvider
  }],
  controllers: [AuthController],
  exports:[AuthService,HashingProvider],
  // due to circular dependency 
  // imports:[UsersModule],
  imports:[
    forwardRef(()=>UsersModule),
  ConfigModule.forFeature(authConfig)
],
})
export class AuthModule {}
