import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  exports:[AuthService],
  // due to circular dependency 
  // imports:[UsersModule],
  imports:[forwardRef(()=>UsersModule)],
})
export class AuthModule {}
