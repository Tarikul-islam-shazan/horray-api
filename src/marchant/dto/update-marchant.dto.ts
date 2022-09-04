import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UpdateMarchantDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  address?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumberString()
  @IsPhoneNumber('BD')
  phone?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  latitude?: number;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  longitude?: number;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  discount?: number;
}
