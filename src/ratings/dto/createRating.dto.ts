import { IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { EtransactionType } from "../enum/transactionType.enum";

export class createRatingsDto {
    
    @IsNotEmpty()
    @IsString()
    sourceId: string;

    @IsNotEmpty()
    @IsString()
    sourceType: string;

    @IsNotEmpty()
    @IsString()
    transactionId: string;

    @IsNotEmpty()
    @IsString()
    @IsEnum( EtransactionType)
    transactionType: EtransactionType;

    @IsNotEmpty()
    overAllRating: number;

    @IsNotEmpty()
    scale: number;

    @IsNotEmpty()
    overAllDescription: string;

    @IsOptional()
    status: string;

    @IsOptional()
    @IsMongoId()
    reviewedBy: string;

}