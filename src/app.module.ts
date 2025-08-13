import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { QuestionModule } from './modules/question/question.module';
import { UseranswerModule } from './modules/useranswer/useranswer.module';


@Module({
  imports: [CoreModule, QuestionModule, UseranswerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}