/* nestjs */
import {
  Get,
  Req,
  Body,
  Patch,
  Controller,
  NotFoundException,
  Post,
} from "@nestjs/common";

/* providers */
import { UserService } from "./user.service";

/* entities */
import { User } from "./entities/user.entity";

/* utils */
import { PassportRequest } from "../utils/api-types.utils";
import { CreateUserDto } from "./dto/create-user.dto";
import { AllowAnon } from "../auth/guards/allow-anon.guard";
////////////////////////////////////////////////////////////////////////////////

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @AllowAnon()
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{
    new: boolean;
    user: User;
  }> {
    return await this.userService.create(createUserDto)
  }

  @Get("profile")
  profile(@Req() req: PassportRequest): Promise<User> {
    if (!req.user) throw new NotFoundException("User not found");
    return this.userService.profile(req.user.id);
  }

  @Patch()
  update(
    @Req() req: PassportRequest,
    @Body() update: Partial<User>
  ): Promise<User | null> {
    if (!req.user) throw new NotFoundException("User not found");
    return this.userService.update(req.user.id, update);
  }
}
