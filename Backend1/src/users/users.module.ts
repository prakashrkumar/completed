import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { profile } from 'src/profile/profile.entity';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { ConfigModule } from '@nestjs/config';
import authConfig from 'src/auth/config/auth.config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthorizeGurad } from 'src/auth/guards/AuthorizeGurad';

@Module({
  providers: [UsersService ],
  controllers: [UsersController],
  exports:[UsersService],
  // ese ke karan table create hota hai
  imports:[
    PaginationModule,
    TypeOrmModule.forFeature([User,profile]),
    forwardRef(()=>AuthModule),
  

  ]
  
})
export class UsersModule {}
