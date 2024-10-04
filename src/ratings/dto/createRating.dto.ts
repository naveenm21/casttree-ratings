import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class createRatingsDto {
    @IsNotEmpty()
    @IsString()
    sourceId: string;

    @IsNotEmpty()
    @IsString()
    sourceType: string;

    @IsNotEmpty()
    overAllRating: number;

    @IsNotEmpty()
    scale: number;

    @IsNotEmpty()
    overAllDescription: string;

    @IsNotEmpty()
    status: string;

    @IsOptional()
    @IsMongoId()
    reviewedBy: string;

}