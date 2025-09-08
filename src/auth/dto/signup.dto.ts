import { IsArray, IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from '../../common/roles.enum';

export class SignupDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsArray()
  @IsOptional()
  roles?: Role[];

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;
}


