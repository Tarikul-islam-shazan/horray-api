import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @Length(2, 50)
  @IsString()
  firstName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @Length(2, 50)
  @IsString()
  lastName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Length(5, 255)
  @IsString()
  @IsEmail()
  email?: string;
}
