import { Injectable } from '@nestjs/common';
import { CreateUseranswerDto } from './dto/create-useranswer.dto';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class UseranswerService {
  constructor(private db: PrismaService) { }

  async create({ answerId, questionId }: CreateUseranswerDto, userId:string) {
    try {
      const question = await this.db.prisma.question.findUnique({
        where: {
          id: questionId
        },
        select: {
          answers: true
        }
      })

      if (!question) {
        throw new Error('Question not found');
      }

      const answer = question.answers.find(ans => ans.id === answerId)
      if (!answer) {
        throw new Error('Answer not found');
      }

      await this.db.prisma.userAnswer.create({
        data: {
          userId,
          questionId,
          answerId,
          isTrue: answer.isCorrect
        }
      })
      return {
        message: 'success', 
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async findAll(userId:string) {
    try {

      const count = await this.db.prisma.userAnswer.count({
        where: {
          userId,

          isTrue: true
        }
      })
      return {
        message: 'success',
        correctAnswers: `${count}/${await this.db.prisma.userAnswer.count({
          where: {
            userId
          }
        })}`,
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

}
