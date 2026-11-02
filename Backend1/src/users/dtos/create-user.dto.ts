
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, minLength, MinLength } from "class-validator";
import { createProfileDto } from "src/profile/dto/create-profile.dto";

export class CreateUserDto{
  

    
   

   
    @IsEmail()
     @MaxLength(100)
    @IsNotEmpty()
    email:string;

    
     @MaxLength(100)
    @IsNotEmpty()
    username:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
      @MaxLength(100)
   password:string


     @IsOptional()
   profile:createProfileDto | null;

}