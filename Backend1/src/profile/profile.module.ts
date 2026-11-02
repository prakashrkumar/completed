import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { profile } from './profile.entity';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports:[TypeOrmModule.forFeature([profile])]
})
export class ProfileModule {}
