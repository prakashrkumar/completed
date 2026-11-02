import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {

     users:{id:number,name:string,email:string,age:number,gender:string,isMarried:boolean,password:string}[]=[
        {id:1,name:"prakash kumar",email:"Prakashr17032000@gmail.com",age:27,gender:"Male",isMarried:false,password:"Prakshr@0234"},
        {id:2,name:"PoojaBhushan",email:"Bhushan@gmail.com",age:29,gender:"Female",isMarried:true,password:"Prakshr@0235"},
         {id:3,name:"Rupam",age:30,email:"Anupam@gmail.com",gender:"Female",isMarried:true,password:"Prakshr@0235"}

    ]
    constructor(@Inject(forwardRef(()=>AuthService))  private readonly authService:AuthService){}

     getUsers(){
      if(this.authService.authincated){
       return this.users;
      }
      return "your are not login beacuse not authenticated"
      
     }


    getUserById(id:Number){
        return this.users.find(x=>x.id===id);

    }
    createUser(user:{id:number,name:string,email:string,age:number,gender:string,isMarried:boolean,password:string}){
       return this.users.push(user)  
    }

}
