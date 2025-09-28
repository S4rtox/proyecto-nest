import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginUserDTO {
  @IsString()
  @IsEmail()
  userEmail: string;
  @IsString()
  @MinLength(8)
  userPassword: string;
}
