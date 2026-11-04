import { HttpException,HttpStatus } from "@nestjs/common";

export class UserAlreadyExitsException extends HttpException{
    constructor(fieldName:string,filedValue:string){
        super(`User with ${fieldName} ${filedValue} already exists `, HttpStatus.CONFLICT)
    }
}