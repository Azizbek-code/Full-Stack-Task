import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UseranswerService } from './useranswer.service';
import { CreateUseranswerDto } from './dto/create-useranswer.dto';
import { UpdateUseranswerDto } from './dto/update-useranswer.dto';
import { JwtGuard } from 'src/common/guard/jwt.guard';
import { GetUserId } from 'src/common/decorators/get-user.decorator';

@Controller('useranswer')
export class UseranswerController {
  constructor(private readonly useranswerService: UseranswerService) { }

  @Post('/answer')
  @UseGuards(JwtGuard)
  async create(@Body() createUseranswerDto: CreateUseranswerDto, @GetUserId() userId: string) {
    try {
      const data = await this.useranswerService.create(createUseranswerDto,userId)
      return data
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Get('/all')
  @UseGuards(JwtGuard)
  async findAll(@GetUserId() userId:string) {
    return await this.useranswerService.findAll(userId);
  }

}
