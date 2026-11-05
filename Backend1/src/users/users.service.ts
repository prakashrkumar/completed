import { BadRequestException, forwardRef, Get, HttpException, HttpStatus, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { profile } from 'src/profile/profile.entity';
import { ConfigService } from '@nestjs/config';
import { UserAlreadyExitsException } from 'src/CustomExceptions/user-already-exist.exception';
import { PaginationProvider } from 'src/common/pagination/pagination.provider';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import { Paginated } from 'src/common/pagination/paginater.interface';



@Injectable()
export class UsersService {

   constructor(
      private readonly configService:ConfigService,
    @InjectRepository(User)
   private userRepository:Repository<User>,
   @InjectRepository(profile)
   private profileRepository:Repository<profile>,
   private readonly paginationProvider:PaginationProvider
   
   ){}
  public async  getAllUsers(paginationQueryDto:PaginationQueryDto):Promise<Paginated<User>>{
     try{
  return   await  this.paginationProvider.paginateQuery(
         paginationQueryDto,
         this.userRepository,
         null,
         {profile:true}

      )
      // return await this.userRepository.find({
      //    relations:{
      //       profile:true
      //    }
      // })
      
     }
     catch(error){
       if((error as any).code === 'ECONNREFUSED'){
             throw new RequestTimeoutException('An error has occured. please try again later',{
               description:'Could not connect to database'
             })
       }
       if((error as any).code==='23505'){
          throw new BadRequestException('There is some dublicate value for the user in Database')
       }
       console.log(error)
     }

   }

   
   public async createUser(userDto:CreateUserDto){
try{
 // create a ptofile &save
 userDto.profile=userDto.profile ??{}

 // chekc if user with same username/email already exists
 const existingUserWithUsername=await this.userRepository.findOne({
   where:[{username:userDto.username}]
 })
 if(existingUserWithUsername){
   throw new UserAlreadyExitsException('username',userDto.username)
   
 }
 const existingUserWithEmail=await this.userRepository.findOne({
   where:[{email:userDto.email}]
 })
 if(existingUserWithUsername){
   throw new UserAlreadyExitsException('email',userDto.email)
   
 }

 
 

// create the user object
let user=this.userRepository.create(userDto)
// save user profile
return await this.userRepository.save(user)
   }
   catch(error){
      if((error as any).code === 'ECONNREFUSED'){
             throw new RequestTimeoutException('An error has occured. please try again later',{
               description:'Could not connect to database'
             })
      }
      throw error;
   }
}

   public async FindUserById(id:number){
     const user=  await this.userRepository.findOneBy({id})
     if(!user){
      throw new HttpException({
         status:HttpStatus.NOT_FOUND,
         error:'the user with ID '+ id + ' was not found',
         table:'user'
      }, HttpStatus.NOT_FOUND, {
         description:'The exception occured beacuse a user with ID ' + id + ' was not found'
      })
     }
     return user;
   }

}
