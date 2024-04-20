/* nestjs */
import {
  Logger,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

/* external dependencies */
import { DataSource, Repository } from "typeorm";

/* entities */
import { User } from "./entities/user.entity";

/* dtos */
import { CreateUserDto } from "./dto/create-user.dto";

/* utils */
import { BaseService } from "../utils/base-service.utils";
////////////////////////////////////////////////////////////////////////////////

@Injectable()
export class UserService extends BaseService<User> {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    protected readonly repository: Repository<User>,
    protected readonly datasource: DataSource,
  ) {
    super(repository, datasource);
  }

  /**
   * Creates new user.
   * @param createUserDto - user data
   * @param ip - user IP address
   * @returns {Promise<User>} created user
   * @throws {UnauthorizedException} if email already exists
   * @throws {BadRequestException} if invalid IP address
   */
  public async create(createUserDto: CreateUserDto): Promise<User> {
    // check if email already exists
    if (await this.findOne(["email"], [createUserDto.email]))
      throw new UnauthorizedException("Email already exists");

    const entity = this.repository.create(createUserDto);
    const user = await this.insertEntity(entity);

    this.logger.log(user?.id, {
      method: this.create.name,
      variable: "user",
      message: "User created successfully.",
      state: user,
    });

    return user;
  }

  /**
   * Returns user profile.
   * @param id - user id
   * @returns {Promise<User>} user profile
   * @throws {NotFoundException} if user not found
   */
  public async profile(id: number): Promise<User> {
    const user = await this.findOne(
      ["id"],
      [id],
    )

    if (!user) throw new NotFoundException("User not found.");

    return user;
  }
}
