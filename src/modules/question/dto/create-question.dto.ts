import { IsArray, IsString, Length, IsBoolean, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class AnswerDto {
    @IsString()
    text: string;

    @IsBoolean()
    isCorrect: boolean;
}

export class CreateQuestionDto {
    @IsString()
    text: string;

    @IsArray()
    @ValidateNested({ each: true }) 
    @Type(() => AnswerDto)
    answers: AnswerDto[];
}
