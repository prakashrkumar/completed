import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';


@Controller('users')
export class UsersController {
 constructor(private readonly usersService :UsersService){}
    @Get('{/:isMarried}')
   getUsers(){
    return this.usersService.getAllUsers()
   }
    
    

    @Post()
    createUser(@Body() user:CreateUserDto){
    this.usersService.createUser(user)
    }

    @Delete(':id')
    public deleteUser(@Param('id',ParseIntPipe) id:number){
        this.usersService.deleteUser(id)
    
    }


   
}
