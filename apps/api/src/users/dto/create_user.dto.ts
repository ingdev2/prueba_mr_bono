import {
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsString,
  IsDateString,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
