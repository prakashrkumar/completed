import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Tweet } from './tweet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class TweetService {
    constructor(
        private readonly userService:UsersService,
       @InjectRepository(Tweet) private readonly tweetRepository:Repository<Tweet>
    ){}
   


 public async   getTweet(userId:number){
   return    await this.tweetRepository.find({
        where:{ user:{id:userId}},
        relations:{user:true}
      })
       
    }


    public async CreateTweet(createTweetDto:CreateTweetDto){
      // find user with the given  userid from table
    let user=  await this.userService.FindUserById(createTweetDto.userId) 

      // cretae a Tweet
      let tweet=await this.tweetRepository.create({...createTweetDto,user:user})

      // save the tweet
    return   await this.tweetRepository.save(tweet)
    }
}
