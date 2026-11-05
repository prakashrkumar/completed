import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationQueryDto{
    @IsOptional()
    @IsPositive()
    // @Type(()=>Number) // main ts me data daype explicate conversion ke liya set akr diya hai so manually non need
    limit?:number=10;
     @IsOptional()
    @IsPositive()
     @Type(()=>Number)
    page?:number=1
}