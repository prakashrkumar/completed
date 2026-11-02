import { forwardRef, Get, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { profile } from 'src/profile/profile.entity';

@Injectable()
export class UsersService {

   constructor(
    @InjectRepository(User)
   private userRepository:Repository<User>,
   @InjectRepository(profile)
   private profileRepository:Repository<profile>
    
   ){}
   getAllUsers(){
   // erger loading m-1 commient wala
return this .userRepository.find({
    relations:{   
        profile:true
    }
})

//return this.userRepository.find() // m-2 user entity me
   }

   
   public async createUser(userDto:CreateUserDto){
//    // Create a proife & save
//    userDto.profile=userDto.profile ?? {};
//    let Profile=this.profileRepository.create(userDto.profile);
//    await this.profileRepository.save(Profile)

//    // create User Object
//    let user=this.userRepository.create(userDto);

//    user.profile=Profile;

//    // Save the user object
//   return  await this.userRepository.save(user)





//when using cascding and same result acchive and using this method
  userDto.profile=userDto.profile ?? {}
  // create user Object
  let user=this.userRepository.create(userDto);
  // save the user object
  return await this.userRepository.save(user)

   }


   public async deleteUser(id:number){

      // // find  the user with given id
      // let user=await this.userRepository.findOneBy({id})

      // // Delete user
      // await this.userRepository.delete(id);
      // // Delete  the profile
      // this.profileRepository.delete(user.profile.id)

      // //send a response
      // return {delete:true} 


      // using cascading prefard this method
      //Delete the user

      await this.userRepository.delete(id);

      // send a response
      return {delete:true};

   }

}
