import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.cookies?.token; 
        console.log(request.cookies);
        console.log("Token:", token);

        
        if (!token) throw new UnauthorizedException('Token is missing');

        const data = await this.jwtService.verifyAsync(token);
        if (!data) throw new UnauthorizedException('Token is invalid');

        request.user = data;
        return true;

    }
}