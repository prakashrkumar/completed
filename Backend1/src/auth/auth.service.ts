import { Body, forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import authConfig from './config/auth.config';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { HashingProvider } from './provider/hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { ActiveUserType } from './interfaces/active-user-type.interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
    authincated:boolean=false;
    constructor(
       @Inject(forwardRef(()=>UsersService))  
        private readonly userService:UsersService,
        @Inject(authConfig.KEY)
        private readonly authConfiguration:ConfigType<typeof authConfig>,
         private readonly hashingProvider:HashingProvider,
         private readonly jwtService:JwtService
    
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

   
   // Generate jwt & send in the response
  return this.generateToken(user)
      
        
      
    }
    public async RefreshToken(refreshTokenDto:RefreshTokenDto){
      try{
             // 1 verify the refresh Token
  const {sub} =  await this.jwtService.verifyAsync(refreshTokenDto.refreshToken,{
         secret:this.authConfiguration.secret,
         audience:this.authConfiguration.audience,
         issuer:this.authConfiguration.issuer
      })
      // 2 find the user from DB Usign User ID
   const user=   await this.userService.FindUserById(sub)
      // 3 Geerate An Access Token & Refresh Token
  return  await this.generateToken(user)
      }
      catch(error){
         throw new UnauthorizedException(error)

      }
  

    }
    public async signup( createUserDto:CreateUserDto){
      return await this.userService.createUser(createUserDto);

    }
    private async signToken<T>(userId:number,expiresIn:number,payload?:T){
       return await this.jwtService.signAsync({
    sub:userId,
    ...payload
 },{
    secret:this.authConfiguration.secret,
    expiresIn:this.authConfiguration.expiresIn,
    audience:this.authConfiguration.audience,
    issuer:this.authConfiguration.issuer
 })

    }

    private async generateToken(user:User){
      // Generate an access token

const accessToken=await this.signToken<Partial<ActiveUserType>>(user.id,this.authConfiguration.expiresIn,{email:user.email})

      // generate a refresh token
      const refreshToken=await this.signToken(user.id,this.authConfiguration.refeshTokenExpiresIn)

      return {token:accessToken,refreshToken}
    }
}
