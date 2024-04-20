/* nestjs */
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

/* external dependencies */
import { ExtractJwt, Strategy } from "passport-jwt";

/* providers */
import { UserService } from "../user/user.service";

/* entities */
import { User } from "../user/entities/user.entity";
////////////////////////////////////////////////////////////////////////////////

interface Payload {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

/**
 * JwtStrategy extends PassportStrategy from nestjs/passport and permits only
 * authenticated users to access the route.
 * @see https://docs.nestjs.com/recipes/passport#implementing-passport-jwt
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  public async validate(payload: Payload): Promise<User> {
    return await (this.userService.findOne(
      ["email"],
      [payload.email]
    ) as Promise<User>);
  }
}
