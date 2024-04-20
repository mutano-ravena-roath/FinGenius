import {
  Length,
  IsEmail,
  IsString,
  MaxLength,
  IsOptional,
} from "class-validator";
import { Transform } from "class-transformer";
//////////////////////////////////////////////////////////////////////////////////////

export class CreateUserDto {
  @IsOptional()
  @Transform((name) => name.value.trim())
  @IsString()
  @MaxLength(50, { message: "Name cannot be longer than 50 characters" })
  name?: string;

  @IsOptional()
  @Transform((nickname) => nickname.value.trim())
  @IsString()
  @MaxLength(50, { message: "Nickname cannot be longer than 50 characters" })
  nickname?: string;

  @Transform((email) => email.value.toLowerCase())
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 20, {
    message: "Password must be between 8 and 20 characters long",
  })
  password: string;

  @IsString()
  @Length(8, 20, {
    message: "Password must be between 8 and 20 characters long",
  })
  passwordConfirm: string;

  @IsOptional()
  phoneNumber?: string;

  @IsOptional()
  nationalId?: string;
}
