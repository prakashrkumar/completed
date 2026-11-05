import { BadRequestException, ConflictException, Injectable, NotFoundException, Param, ParseIntPipe, RequestTimeoutException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Tweet } from './tweet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTweetDto } from './dto/create-tweet.dto';

import { HashtagService } from 'src/hashtag/hashtag.service';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';

import { PaginationProvider } from 'src/common/pagination/pagination.provider';
import { Paginated } from 'src/common/pagination/paginater.interface';
import { ActiveUserType } from 'src/auth/interfaces/active-user-type.interface';

@Injectable()
export class TweetService {
    constructor(
        private readonly userService:UsersService,
          private readonly hashtagService:HashtagService,
       @InjectRepository(Tweet) private readonly tweetRepository:Repository<Tweet>,
       private readonly paginationProvider:PaginationProvider
     
       
    ){}
   


 public async getTweet(userId:number,PageQueryDto:PaginationQueryDto):Promise<Paginated<Tweet>>{
  let user = await this.userService.FindUserById(userId)
  if(!user){
    throw new NotFoundException(`this ${userId} user is not found`)
  }

   return await this.paginationProvider.paginateQuery(
  PageQueryDto,
    this.tweetRepository,
    {user:{id:userId}}
   )
    }


    public async CreateTweet(createTweetDto:CreateTweetDto,userId:number){
     let user=undefined;
     let hashtags=undefined;
      try{
    // find user with the given  userid from table
   user=  await this.userService.FindUserById(userId) 
    // fetch all the hashtag based on hashtag array
    if(createTweetDto.hashtags){
 hashtags=await this.hashtagService.findHashtags(createTweetDto.hashtags)
    }
   
     }
     catch(error){
      throw new RequestTimeoutException();

     }
     
     if(createTweetDto.hashtags?.length !==hashtags?.length){
      throw new BadRequestException()
     }

      // cretae a Tweet
      //let tweet=await this.tweetRepository.create({...createTweetDto,user:user})
      let tweet= this.tweetRepository.create({...createTweetDto,user,hashtags})

      // save the tweet
  try{
      return   await this.tweetRepository.save(tweet)
  }
  catch(error){
    throw new ConflictException(error)
  }
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
