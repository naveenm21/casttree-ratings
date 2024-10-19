import { IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { EtransactionType } from "../enum/transactionType.enum";
import { EsourceType } from "../enum/sourceType.enum";


export class filterDto {
    
    @IsNotEmpty()
  
    sourceIds: string | string[];

    @IsNotEmpty()
    @IsString()
    @IsEnum( EsourceType)
    sourceType: EsourceType;

   

}