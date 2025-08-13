import { IsOptional, IsString } from "class-validator";

export class CreateUseranswerDto {
    @IsString()
    questionId: string;
    @IsString()
    answerId: string
    @IsString()
    @IsOptional()
    userId: string;
}
