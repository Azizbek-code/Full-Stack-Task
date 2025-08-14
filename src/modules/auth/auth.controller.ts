import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import type { Response  } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  async login(@Body() createAuthDto: CreateAuthDto,@Res({passthrough:true}) res: Response) {
    try {
      const data = await this.authService.login(createAuthDto)
      res.cookie('token', data?.token, {
        httpOnly: true
      })
      return data
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
