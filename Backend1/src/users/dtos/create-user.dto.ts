
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto{
     @IsNumber()
    id:string;

    @IsString({message:"name should be a string value"})
    @IsNotEmpty()
    @MinLength(3,{message:"name should have more than 3 char"})
    name:string;

   
    @IsEmail()
    email:string;

    @IsNumber()
    age:number;

    @IsString()
   @IsOptional()
    gender?:string;

   @IsBoolean()
    isMarried:boolean

}