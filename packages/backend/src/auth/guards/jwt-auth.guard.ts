/* nestjs */
import {
  Injectable,
  ExecutionContext,
  ImATeapotException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
////////////////////////////////////////////////////////////////////////////////

/**
 * JwtAuthGuard extends AuthGuard from nestjs/passport and permits only
 * authenticated users to access the route.
 * @see https://docs.nestjs.com/recipes/passport#extending-guards
 * @see https://docs.nestjs.com/recipes/passport#enable-authentication-globally
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const headers = context.switchToHttp().getRequest().rawHeaders;
    const [jwt] = headers.filter((el: string) => el.startsWith("Bearer"));

    if (
      !jwt &&
      this.reflector.getAllAndOverride<boolean>("isPublic", [
        context.getHandler(),
        context.getClass(),
      ])
    )
      return true;

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any) {
    if (err || !user) throw new ImATeapotException("Invalid token. Try again.");

    return user;
  }
}
