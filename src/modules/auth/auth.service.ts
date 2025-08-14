import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import bcrypt from 'bcrypt'
import { PrismaService } from 'src/core/database/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private db: PrismaService, private readonly jwtService: JwtService) { }

  async login({ passwords, username }: CreateAuthDto) {
    try {
      const CheckUsername = await this.db.prisma.user.findUnique({
        where: {
          username
        }
      })
      if (!CheckUsername) {
        throw new UnauthorizedException('Username or password is incorrect');
      }
      const comparedPassword = await bcrypt.compare(passwords, CheckUsername.password)
      if (!comparedPassword) {
        throw new UnauthorizedException('Username or password is incorrect');
      }
      const { password, ...result } = CheckUsername
      const token = this.jwtService.sign({ ...result })
      return {
        message: 'success',
        token: token
      }
    } catch (error) {

    }
  }

}
