/* nestjs */
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module, Global } from "@nestjs/common";

/* controllers */
import { UserController } from "./user.controller";

/* providers */
import { UserService } from "./user.service";

/* entities */
import { User } from "./entities/user.entity";
////////////////////////////////////////////////////////////////////////////////

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
