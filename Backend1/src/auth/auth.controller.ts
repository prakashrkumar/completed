import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { HashingProvider } from './provider/hashing.provider';
import { AllowAnonymous } from './decorators/allow-anonymous.decorator';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService 
       
    ){}
    @AllowAnonymous()
    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() loginDto:LoginDto){
       return  this.authService.login(loginDto)

    }
    @AllowAnonymous()
    @Post('signup')
   public async signup(@Body() createUserDto:CreateUserDto){
      return   await this.authService.signup(createUserDto)

    }
     @AllowAnonymous()
    @Post('refresh-token')
    @HttpCode(HttpStatus.OK)
    public async refreshToken(@Body() refreshTokenDto:RefreshTokenDto){
    return   this.authService.RefreshToken(refreshTokenDto)
      
    }

}
