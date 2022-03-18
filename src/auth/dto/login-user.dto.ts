import {
  IsNotEmpty,
  IsNumberString,
  IsPhoneNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @IsNumberString()
  @IsPhoneNumber('BD')
  phone: string;

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
}
