/* nestjs */
import {
  Post,
  Body,
  Controller,
} from "@nestjs/common";
// import { AuthGuard } from "@nestjs/passport";

/* providers */
import { AuthService } from "./auth.service";
import { UserService } from "../user/user.service";

/* entities */
import { CreateUserDto } from "../user/dto/create-user.dto";

/* guards */
import { AllowAnon } from "./guards/allow-anon.guard";
////////////////////////////////////////////////////////////////////////////////

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
  ): Promise<{
    access_token: string;
    newUser: boolean;
  }> {
    console.log("createUserDto", createUserDto)
    const user = await this.userService.create(createUserDto);

    const token = await this.authService.login(user.user);
    const newUser = user.new;

    return { 
      access_token: token.access_token,
      newUser,
     };
  }
}
