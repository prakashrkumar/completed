import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    authincated:boolean=false;
    constructor(@Inject(forwardRef(()=>UsersService))  private readonly userService:UsersService){}

    login(email:string,pass:string){
        const user=this.userService.users.find(x=>x.email===email && x.password===pass)
        if(user){
            this.authincated=true;
            return 'my Token'
        }
        return "user does not exist"
    }
}
