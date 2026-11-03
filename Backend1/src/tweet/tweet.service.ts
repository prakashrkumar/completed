import { Injectable, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Tweet } from './tweet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTweetDto } from './dto/create-tweet.dto';

import { HashtagService } from 'src/hashtag/hashtag.service';
import { UpdateTweetDto } from './dto/update-tweet.dto';

@Injectable()
export class TweetService {
    constructor(
        private readonly userService:UsersService,
          private readonly hashtagService:HashtagService,
       @InjectRepository(Tweet) private readonly tweetRepository:Repository<Tweet>
     
       
    ){}
   


 public async   getTweet(userId:number){
   return    await this.tweetRepository.find({
        where:{ user:{id:userId}},
        relations:{user:true,hashtags:true}
      })
       
    }


    public async CreateTweet(createTweetDto:CreateTweetDto){
      // find user with the given  userid from table
    let user=  await this.userService.FindUserById(createTweetDto.userId) 
    // fetch all the hashtag based on hashtag array
    let hashtags=await this.hashtagService.findHashtags(createTweetDto.hashtags)

      // cretae a Tweet
      //let tweet=await this.tweetRepository.create({...createTweetDto,user:user})
      let tweet=await this.tweetRepository.create({...createTweetDto,user,hashtags})

      // save the tweet
    return   await this.tweetRepository.save(tweet)
    }

public async updateTweet(upadteTweetDto:UpdateTweetDto){
      // find all hashtags
      let hashtags=await this.hashtagService.findHashtags(upadteTweetDto.hashtags)
       // find the tweet by id
        let tweet=await this.tweetRepository.findOneBy({id:upadteTweetDto.id})
        // upadate properties of the tweet
       tweet.text=upadteTweetDto.text ?? tweet.text;
       tweet.image=upadteTweetDto.image ??tweet.text;
       tweet.hashtags=hashtags;

       //save the tweet
      return await this.tweetRepository.save(tweet)


      }
      public async deleteTweet(id:number){
      await  this.tweetRepository.delete({
          id
        })
        return {delete:true,id}

      }
    
}
