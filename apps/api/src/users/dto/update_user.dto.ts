import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserPatientDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
