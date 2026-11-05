import { Body, forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import authConfig from './config/auth.config';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { HashingProvider } from './provider/hashing.provider';

@Injectable()
export class AuthService {
    authincated:boolean=false;
    constructor(
       @Inject(forwardRef(()=>UsersService))  
        private readonly userService:UsersService,
        @Inject(authConfig.KEY)
        private readonly authConfiguration:ConfigType<typeof authConfig>,
         private readonly hashingProvider:HashingProvider
    
    ){}

   public async login(loginDto:LoginDto){
    // 1. find the user with username
    let user=await this.userService.findUserByUsername(loginDto.username)


    //2. if user is Available, compare the passsword
    let isEqual:boolean=false;
    isEqual=await this.hashingProvider.comparePassword(loginDto.password,user.password)

    if(!isEqual){
        throw new UnauthorizedException('Incorrect Password')
    }

    // if the password match , Login success -return AccessToken

    // send the reponse
    return {
        data:user,
        success:true,
        mesage:'User logged in successfully'
    }

       
        
      
    }
    public async signup( createUserDto:CreateUserDto){
      return await this.userService.createUser(createUserDto);

    }
}
