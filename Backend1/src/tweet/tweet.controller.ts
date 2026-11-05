import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import { ActiveUser } from 'src/auth/decorators/active.user.decorator';

@Controller('tweet')
export class TweetController {
    constructor(private readonly tweetService:TweetService ){}

  @Get('{:userId}') 
  public GetTweet(
    @Param('userId',ParseIntPipe) userid:number,
  @Query() paginationQueryDto:PaginationQueryDto) {
    console.log(paginationQueryDto)
    return this.tweetService.getTweet(userid,paginationQueryDto)
  }
  @Post()
  public CreateTweet(@Body() tweet:CreateTweetDto,@ActiveUser('sub') userId){
  //  console.log(user)
   return this.tweetService.CreateTweet(tweet,userId)
  }
@Patch()
public  updateTweet(@Body() tweet:UpdateTweetDto){
     this.tweetService.updateTweet(tweet)
}

@Delete(':id')
public DeleteTweet(@Param('id', ParseIntPipe) id:number){
  return  this.tweetService.deleteTweet(id);

}
}
