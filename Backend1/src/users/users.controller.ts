import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
 constructor(private readonly userService :UsersService){}
    @Get()
    //getuers(@Query('gender') query:any)   query se only gender aayega
    //getuers(@Query() query:any)  abhi query me ja sabhiaayega dot se nikhal skte ho
    getuers(@Query() query:any){  
        console.log(query)
        if(query.gender){
       return     this.userService.getUsers().filter(x=>x.gender===query.gender)

        }
    return  this.userService.getUsers()
    }
    
    //getUserById(@Param('id') id:string)
    // for make optional->it kept alawys  last isMarried->optional
    // @Get(':id/:name{/:gender}')
   
    //getUserById(@Param() param:any)
 @Get(':id')
    getUserById(@Param('id',ParseIntPipe) id:number){
        //console.log(param,param.name)
      //  return this.userService.getUserById(Number(id))
        return this.userService.getUserById(id)

    }
    @Post()
    createUser(@Body() user:{id:number,name:string,age:number,gender:string,isMarried:boolean}){
        this.userService.createUser(user)
        return "new user cretae successfully"
    }
}
