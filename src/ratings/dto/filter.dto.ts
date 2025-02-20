import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { EsourceType } from "../enum/sourceType.enum";
export class filterDto {
    @IsNotEmpty()
    sourceIds: string | string[];

    @IsNotEmpty()
    @IsString()
    @IsEnum(EsourceType)
    sourceType: EsourceType;
}

export class getServiceRequestRatingsDto {
    @IsNotEmpty()
    transactionIds: string | string[];

    @IsNotEmpty()
    @IsString()
    userId: string ;
}