import { PartialType } from '@nestjs/mapped-types';
import { CreateUseranswerDto } from './create-useranswer.dto';

export class UpdateUseranswerDto extends PartialType(CreateUseranswerDto) {}
