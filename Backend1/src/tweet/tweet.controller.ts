import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';

@Controller('tweet')
export class TweetController {
    constructor(private readonly tweetService:TweetService ){}

  @Get(':userId') 
  public GetTweet(@Param('userId',ParseIntPipe) userid:number) {
    return this.tweetService.getTweet(userid)
  }
  @Post()
  public CreateTweet(@Body() tweet:CreateTweetDto){
    return this.tweetService.CreateTweet(tweet);
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
