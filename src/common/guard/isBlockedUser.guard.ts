import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service'; 

@Injectable()
export class isBlockedUser implements CanActivate {
    constructor(private db: PrismaService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const id: string = request['user'].id
        if (!id) throw new UnauthorizedException('please register')
        const user = await this.db.prisma.user.findUnique({
            where: {
                id
            }
        })
        if (!user) throw new NotFoundException('user is not found')

        if (user.isBlocked) throw new ForbiddenException('uzur siz  blockdasiz')
        return true
    }
}