import { Body, Controller, DefaultValuePipe, Get, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { number } from 'joi';


@Controller('users')
export class UsersController {
 constructor(private readonly usersService :UsersService){}
    @Get()
   getUsers(){
    return this.usersService.getAllUsers()
   }

    @Get(':id')
   getUserbyId(@Param('id', ParseIntPipe) id:number){
    return this.usersService.FindUserById(id)
   }
    
    

    @Post()
    createUser(@Body() user:CreateUserDto){
    this.usersService.createUser(user)
    }

   
}
