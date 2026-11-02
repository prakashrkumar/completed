import { forwardRef, Get, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

   constructor(
    @InjectRepository(User)
   private userRepository:Repository<User>
    
   ){}
   getAllUsers(){
return this .userRepository.find()
   }

   
   public async createUser(userDto:CreateUserDto){
    // validate if a user exist with the given email
    const user=await this.userRepository.findOne({
        where:{email:userDto.email}
    })
    // Handle the error/exception
    if(user){
        return 'the user with the given email allready exists'
    }
    // create the user
    let newUser= this.userRepository.create(userDto);
    newUser=await this.userRepository.save(newUser)
    return newUser;

   }

}
