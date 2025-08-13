import { Module } from '@nestjs/common';
import { UseranswerService } from './useranswer.service';
import { UseranswerController } from './useranswer.controller';

@Module({
  controllers: [UseranswerController],
  providers: [UseranswerService],
})
export class UseranswerModule {}
