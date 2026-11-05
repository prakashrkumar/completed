import { Hashtag } from "src/hashtag/hashtag.entity";
import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Tweet{
     @PrimaryGeneratedColumn()
    id:number;
     @Column({
        type:'text',
        nullable:true
     })
    text:string;

     @Column({
        type:'text',
        nullable:true
     })
    image?:string;

     @CreateDateColumn()
    createdAt:Date;
     @UpdateDateColumn()
    updatedAt:Date;
     
// for eager method m->2 where
   // @ManyToOne(()=>User,(user)=>user.tweets,{eager:true })
    @ManyToOne(()=>User,(user)=>user.tweets,{eager:true})
    user:User

// many to many one directional
   //   @ManyToMany(()=>Hashtag)
   //   @JoinTable({
   //    name: 'tweet_hashtags_hashtag'
   //   })
   @ManyToMany(()=>Hashtag,(hashtag)=>hashtag.tweet,{eager:true})
     @JoinTable({
      name: 'tweet_hashtags_hashtag'
     })
    hashtags:Hashtag[];



}