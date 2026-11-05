import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TweetModule } from './tweet/tweet.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProfileModule } from './profile/profile.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PaginationModule } from './common/pagination/pagination.module';
import  appConfig  from './config/app.config';
import databaseConfig from './config/database.config';
import envValidation from './auth/config/env.validation';

const ENV=process.env.NODE_ENV;



@Module({
  imports: [
     // config module — sabse pehle load karo
     ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:!ENV? '.env':`.env.${ENV.trim()}`,
      load:[appConfig,databaseConfig],
      validationSchema:envValidation
      
     }),
    // data base connection
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService:ConfigService)=>({
        type:'mysql',

      autoLoadEntities:configService.get('database.autoLoadEntities'),
      synchronize:configService.get('database.syncronize'),
      host:configService.get('database.host'),
      port:+configService.get('database.port'),
      username:configService.get('database.username'),
      password:configService.get('database.password'),
      database:configService.get('database.name')
      })
    }),
    ProfileModule,
    HashtagModule,
    UsersModule,
    TweetModule,
    AuthModule,
    PaginationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
