import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TweetModule } from './tweet/tweet.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { ProfileModule } from './profile/profile.module';
import { HashtagModule } from './hashtag/hashtag.module';



@Module({
  imports: [UsersModule, TweetModule, AuthModule,
    // data base connection
    TypeOrmModule.forRootAsync({
      imports:[],
      inject:[],
      useFactory:()=>({
        type:'mysql',
      //entities:[User], //entity bataiya hai
      autoLoadEntities:true,
      synchronize:true,
      host:'localhost',
      port:3306,
      username:"root",
      password:"Prakashr@0234",
      database:"nestjs_db"
      })
    }),
    ProfileModule,
    HashtagModule
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
