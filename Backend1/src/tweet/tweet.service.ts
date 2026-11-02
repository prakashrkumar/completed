import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TweetService {
    constructor(private readonly userService:UsersService){}
    tweets:{text:string,date:Date,userId:number}[]=[
        {text:"some text", date:new Date('2024-09-12'),userId:1},
        {text:"some other text", date:new Date('2026-09-12'),userId:1},
        {text:"some other other text", date:new Date('2025-09-12'),userId:2},
        
    ]


    getTweet(userId:number){
        const user=this.userService.getUserById(userId)
        const tweets=  this.tweets.filter(x=>x.userId===userId)

        const reponse=tweets.map((x)=>{return{text:x.text,date:x.date,name:user.name}})
        return reponse;
    }
}
