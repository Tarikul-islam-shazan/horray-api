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

export class CreateMarchantDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  @IsPhoneNumber('BD')
  phone: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  discount: number;
}
