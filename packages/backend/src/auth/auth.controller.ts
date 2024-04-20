/* nestjs */
import {
  Req,
  Post,
  Body,
  HttpCode,
  UseGuards,
  Controller,
  HttpStatus,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/* providers */
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";

/* entities */
import { CreateUserDto } from "../user/dto/create-user.dto";

/* guards */
import { AllowAnon } from "./guards/allow-anon.guard";

/* utils */
import { PassportRequest } from "../utils/api-types.utils";
////////////////////////////////////////////////////////////////////////////////

/**
 * PassportJwt is used to define the shape of the data returned from the passport-jwt strategy.
 * @property {string} access_token - the JWT token
 */
export interface PassportJwt {
  access_token: string;
}

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @AllowAnon()
  @Post("signup")
  async signup(
    @Body() createUserDto: CreateUserDto,
    @Req() req: PassportRequest
  ): Promise<PassportJwt> {
    return this.authService.login(
      await this.userService.create(createUserDto)
    );
  }

  @AllowAnon()
  @UseGuards(AuthGuard("local"))
  @HttpCode(HttpStatus.OK)
  @Post("signin")
  async signin(@Req() req: PassportRequest): Promise<PassportJwt> {
    if (!req.user) throw new UnauthorizedException("User not found.");
    return await this.authService.login(req.user);
  }
}
