import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { HttpAdapterHost, Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        const handler = context.getHandler()
        const role = request.user.role
        const roles = this.reflector.get('roles', handler)
        if (!roles.includes(role)) throw new HttpAdapterHost()
        return true
    }
}