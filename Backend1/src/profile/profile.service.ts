import { Get, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { profile } from './profile.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(profile)
    private readonly profileRepository:Repository<profile>

  ){} 

  public getAllProfile(){
    return this.profileRepository.find()
  }
   
}
