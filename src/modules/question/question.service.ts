import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class QuestionService {
  constructor(private db: PrismaService) { }

  async create(createQuestionDto: CreateQuestionDto) {
    try {
      const question = await this.db.prisma.question.create({
        data: {
          text: createQuestionDto.text,
        }
      })
      if (createQuestionDto.answers && createQuestionDto.answers.length >= 2) {
        const answers = createQuestionDto.answers.map(({ isCorrect, text }) => {
          return this.db.prisma.answer.create({
            data: {
              text,
              isCorrect,
              questionId: question.id
            }
          })
        })
        await Promise.all(answers);
      }
      return {
        message: 'success',
        questionId: question.id
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async getQuestion(step_number: number) {
    try {
      const question = await this.db.prisma.question.findFirst({
        where: { step_number: +step_number },
        include: {
          answers: {
            select: {
              id: true,
              text: true,
              isCorrect: true
            }
          }
        }
      });

      if (!question) {
        throw new Error(`Question with step_number ${step_number} not found`);
      }
      return question;
    } catch (error) {
      console.error('Error in getQuestion:', error);
      throw error;
    }
  }


  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    try {
      const question = await this.db.prisma.question.findUnique({
        where: {
          id
        }
      })
      if (!question) throw new Error('question not found')
      const updatedQuestion = await this.db.prisma.question.update({
        where: {
          id
        },
        data: {
          text: updateQuestionDto.text,
        }
      })
      if (!updateQuestionDto.answers) {
        return { updatedQuestion }
      }
      const answers = updateQuestionDto.answers.map(({ isCorrect, text }) => {
        return this.db.prisma.answer.updateMany({
          where: {
            questionId: updatedQuestion.id
          },
          data: {
            text,
            isCorrect
          }
        })
      })
      await Promise.all(answers);
      return { updatedQuestion, answers };
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async remove(id: string) {
    try {
      await this.db.prisma.question.findUnique({
        where: {
          id
        }
      })
      return {
        message: 'Question deleted successfully'
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
