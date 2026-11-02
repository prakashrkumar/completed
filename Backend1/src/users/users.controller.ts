import { Body, Controller, DefaultValuePipe, Get, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUserParamDto } from './dtos/get-user-param.dto';
import { UpadateUserDto } from './dtos/update-user-param.dto';

@Controller('users')
export class UsersController {
 constructor(private readonly userService :UsersService){}
    @Get('{/:isMarried}')

    getuers(@Query('limit',new DefaultValuePipe(4),ParseIntPipe) limit:number,
    @Query('page',new DefaultValuePipe(9),ParseIntPipe) page:number,
@Param() param:GetUserParamDto)// jab koe parameter ke sath pipline pass karte to o optional parameter nahi required ho jataa
{ 

        console.log(limit,page,param);
        
    return  this.userService.getUsers()
    }
    
    
 @Get(':id')
    getUserById(@Param('id',ParseIntPipe) id:number){

        return this.userService.getUserById(id)

    }
    @Post()
    createUser(@Body() user:CreateUserDto){
       // this.userService.createUser(user)
       console.log(user)
        return "new user cretae successfully"
    }

    @Patch()
    updateUser(@Body() user:UpadateUserDto){
        console.log(user)
        return "partical update"
    }
}
