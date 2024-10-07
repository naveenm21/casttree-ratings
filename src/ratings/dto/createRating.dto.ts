import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

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
    transactionType: string;

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