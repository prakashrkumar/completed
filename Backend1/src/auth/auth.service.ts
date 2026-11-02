import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    authincated:boolean=false;
    constructor(@Inject(forwardRef(()=>UsersService))  private readonly userService:UsersService){}

    login(email:string,pass:string){
        
        return "user does not exist"
    }
}
