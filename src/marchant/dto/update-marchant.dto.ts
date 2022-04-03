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
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  address?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumberString()
  @IsPhoneNumber('BD')
  phone?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  discount?: number;
}
