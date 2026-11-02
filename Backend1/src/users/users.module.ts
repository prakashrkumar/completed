import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  exports:[UsersService],
  // ese ke karan table create hota hai
  imports:[TypeOrmModule.forFeature([User])]
  
})
export class UsersModule {}
