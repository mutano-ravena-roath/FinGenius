/* nestjs */
import { JwtService } from "@nestjs/jwt";
import { Injectable, Logger } from "@nestjs/common";

/* providers */
import { UserService } from "../user/user.service";

/* entities */
import { User } from "../user/entities/user.entity";
////////////////////////////////////////////////////////////////////////////////

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  public async validateUser(wallet: string): Promise<User | null> {
    const user = await this.userService.findOne(["wallet"], [wallet]);
    if (!user) return null;

    return user;
  }

  public async login(user: User) {
    const access_token = this.jwtService.sign({
      wallet: user.wallet,
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
