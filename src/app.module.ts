import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { QuestionModule } from './modules/question/question.module';
import { UseranswerModule } from './modules/useranswer/useranswer.module';
import { AuthModule } from './modules/auth/auth.module';


@Module({
  imports: [CoreModule, QuestionModule, UseranswerModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}