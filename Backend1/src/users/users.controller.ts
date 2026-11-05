import { Body, Controller, DefaultValuePipe, Get, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import { AuthorizeGurad } from 'src/auth/guards/AuthorizeGurad';


@Controller('users')
// @UseGuards(AuthorizeGurad) // ya likhana se es controller me  routes per apply ho gaya
export class UsersController {
 constructor(private readonly usersService :UsersService){}
    
    // @UseGuards(AuthorizeGurad)
    @Get()
   getUsers(@Query() pageQueryDto:PaginationQueryDto){
    return this.usersService.getAllUsers(pageQueryDto)
   }
    // @UseGuards(AuthorizeGurad)
    @Get(':id')
   getUserbyId(@Param('id', ParseIntPipe) id:number){
    return this.usersService.FindUserById(id)
   }
    
    

    @Post()
    createUser(@Body() user:CreateUserDto){
    this.usersService.createUser(user)
    }

   
}
