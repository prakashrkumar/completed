import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
     users:{id:number,name:string,email:string,age:number,gender:string,isMarried:boolean}[]=[
        {id:1,name:"prakash kumar",email:"Prakashr17032000@gmail.com",age:27,gender:"Male",isMarried:false},
        {id:2,name:"PoojaBhushan",email:"Bhushan@gmail.com",age:29,gender:"Female",isMarried:true},
         {id:3,name:"Rupam",age:30,email:"Anupam@gmail.com",gender:"Female",isMarried:true}

    ]

     getUsers(){
        return this.users;
     }


    getUserById(id:number){
        return this.users.find(x=>x.id===id);

    }
    createUser(user:{id:number,name:string,email:string,age:number,gender:string,isMarried:boolean}){
      return this.users.push(user)  
    }

}
