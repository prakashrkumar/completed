import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';

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
}
