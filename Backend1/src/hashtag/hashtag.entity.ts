import { Tweet } from "src/tweet/tweet.entity";
import { Column, DeleteDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Hashtag{
     @PrimaryGeneratedColumn()
    id:number;

 @Column({
    type:'varchar',
    length:100,
    nullable:false,
    unique:true
 })
  name:string;

  // implement Softdelete yeek colum banaya hai
  @DeleteDateColumn()
  deletedAt:Date;



  @ManyToMany(()=>Tweet,(tweet)=>tweet.hashtags,{onDelete:'CASCADE'})
  tweet:Tweet[]

}