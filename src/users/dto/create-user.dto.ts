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
import { RoleBase } from '../enums/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(2, 50)
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @Length(2, 50)
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsNumberString()
  @IsPhoneNumber('BD')
  phone: string;

  @IsOptional()
  @Length(5, 255)
  @IsString()
  @IsEmail()
  email?: string;

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

  @IsEnum(RoleBase, { each: true })
  @IsArray()
  @IsNotEmpty()
  roles: RoleBase[];
}
