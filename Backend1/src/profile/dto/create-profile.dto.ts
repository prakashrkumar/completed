
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, minLength, MinLength } from "class-validator";
export class createProfileDto{
     @IsString({message:"firstName should be a string value"})
     
        @MinLength(3,{message:"firstName should have more than 3 char"})
        @MaxLength(100)
        @IsOptional()
        firstName?:string;
    
        @IsString({message:"lastName should be a string value"})
       
        @MinLength(3,{message:"lastName should have more than 3 char"})
        @MaxLength(100)
        @IsOptional()
        lastName?:string;
    
    
         @IsString()
       @IsOptional()
         @MaxLength(10)
        gender?:string;
         
        @IsOptional()
        @IsDate()
        dateOfBirth?:Date;
         
        @IsString()
        @IsOptional()
        bio?:string;

          @IsString()
        @IsOptional()
        profileImage?:string


}