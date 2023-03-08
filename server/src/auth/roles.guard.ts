import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import { Observable } from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {ROLES_KEY} from "./roles-auth.decorator";
import {Reflector} from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private jwtService: JwtService,
                private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
                context.getHandler(),
                context.getClass(),
            ])
            if (!requiredRoles) {
                return true;
            }
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0]

            const token = authHeader.split(' ')[1]

            if (bearer !== 'Bearer' || !token) {

                throw new UnauthorizedException({message: 'User not registered'})
            }

            const user = this.jwtService.verify(token);
            console.log("user" + this.jwtService.verify(token))
            req.user = user;
            let a = user.roles.some(role => requiredRoles.includes(role.value));
            console.log("a ", a)
            return user.roles.some(role => requiredRoles.includes(role.value));

        } catch (e) {
            throw new HttpException('Access denied', HttpStatus.FORBIDDEN)
        }
    }


}