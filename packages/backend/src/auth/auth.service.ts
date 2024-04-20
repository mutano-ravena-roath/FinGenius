/* nestjs */
import { JwtService } from "@nestjs/jwt";
import { Injectable, Logger } from "@nestjs/common";

/* providers */
import { UserService } from "../user/user.service";

/* entities */
import { User, decryptPassword } from "../user/entities/user.entity";
////////////////////////////////////////////////////////////////////////////////

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  public async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userService.findOne(["email"], [email]);
    if (!user) return null;

    return (await decryptPassword(pass, user?.password)) ? user : null;
  }

  public async login(user: User) {
    const access_token = this.jwtService.sign({
      email: user.email,
      sub: user.id,
    });

    this.logger.log(user?.id, {
      method: this.login.name,
      variable: "access_token",
      message: "User logged in",
      state: access_token,
    });

    return { access_token };
  }
}
