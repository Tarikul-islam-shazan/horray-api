import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoleBase } from '../enums/role.enum';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(2, 50)
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(2, 50)
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsNumberString()
  @IsPhoneNumber('BD')
  phone: string;

  @ApiProperty()
  @IsOptional()
  @Length(5, 255)
  @IsString()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(8, 32)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message: 'Password too weak!',
  })
  /**
   *   At least one upper case English letter, (?=.*?[A-Z])
   *   At least one lower case English letter, (?=.*?[a-z])
   *   At least one digit, (?=.*?[0-9])
   *   At least one special character, (?=.*?[#?!@$%^&*-])
   *   Minimum eight in length .{8,} (with the anchors)
   */
  password: string;

  @ApiProperty()
  @IsEnum(RoleBase, { each: true })
  @IsArray()
  @IsNotEmpty()
  roles: RoleBase[];
}
