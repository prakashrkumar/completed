import { IsOptional } from "class-validator";
import { profile } from "src/profile/profile.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity,  JoinColumn,  OneToOne,  PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User{
     @PrimaryGeneratedColumn()
    id:number

       @Column({        
        type:'varchar',
        nullable:false,
        length:100,
        unique:true
})
    username:string


   

      @Column({        
        type:'varchar',
        nullable:false,
        length:100,
        unique:true
})
    email:string
      @Column({        
        type:'varchar',
        nullable:false,
        length:100
})
    password:string;
  @IsOptional()

  @OneToOne(()=>profile,{
    cascade:['insert'],
    eager:true // for erger loading
  })
    

  @JoinColumn()
    profile?:profile






      @CreateDateColumn()
    createdAt:Date;
    @UpdateDateColumn()
    updatedAt:Date;
    @DeleteDateColumn()
    deletedAt:Date;

}