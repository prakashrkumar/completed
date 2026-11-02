import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { CreateUserDto } from "./create-user.dto";

export class UpadateUserDto extends PartialType(CreateUserDto){

}