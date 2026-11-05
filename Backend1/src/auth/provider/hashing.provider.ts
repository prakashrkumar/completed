import { Injectable } from '@nestjs/common';
import { string } from 'joi';

@Injectable()
export abstract class HashingProvider {
 abstract hashPassword(data:string | Buffer):Promise<string>; 
 abstract comparePassword(  
    plainPassword:string |Buffer,
    hashedPassword:string | Buffer

 ):Promise<boolean>;
}
