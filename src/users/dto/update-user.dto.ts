import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @Length(2, 50)
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsNotEmpty()
  @Length(2, 50)
  @IsString()
  lastName?: string;

  @IsOptional()
  @Length(5, 255)
  @IsString()
  @IsEmail()
  email?: string;
}
