import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, UseGuards, SetMetadata, Query } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { RoleGuard } from 'src/common/guard/role.guard';
import { JwtGuard } from 'src/common/guard/jwt.guard';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post('/create')
  @UseGuards(RoleGuard)
  @UseGuards(JwtGuard)
  @SetMetadata('roles',['ADMIN'])
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    try {
      const data = await this.questionService.create(createQuestionDto)
      return data
    } catch (error) {
      throw new HttpException(error.message,error.status || 500)
    }
  }

  @Get('/get')
  async findAll(@Query('step_number') step_number: string) {
    
    const data = await this.questionService.getQuestion(+step_number);
    return data;
    
  }

  @Patch(':id')
  @UseGuards(RoleGuard)
  @UseGuards(JwtGuard)
  @SetMetadata('roles', ['ADMIN'])
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard)
  @UseGuards(JwtGuard)
  @SetMetadata('roles', ['ADMIN'])
  remove(@Param('id') id: string) {
    return this.questionService.remove(id);
  }
}
