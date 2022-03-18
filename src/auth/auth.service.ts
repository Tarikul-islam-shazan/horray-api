import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/users/repositories/user.repository';
import { LoginUserDto } from './dto/login-user.dto';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  logger = new Logger('Auth service');

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<any> {
    try {
      const { phone, password } = loginUserDto;

      const isPhoneValid: UserEntity = await this.userRepository.findOne({
        phone,
      });

      if (!isPhoneValid) {
        throw new NotFoundException('Phone No not found');
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        isPhoneValid.password,
      );
      if (!isPasswordValid) {
        throw new NotFoundException('Password not matched');
      }

      const jwtPayload = {
        id: isPhoneValid.id,
        phone: isPhoneValid.phone,
      };
      const accessToken = await this.jwtService.sign(jwtPayload);
      return accessToken;
    } catch (error) {
      this.logger.error(
        `"src/auth/auth.service.ts", Phone or Password not matched by given phone no.`,
      );
      throw new InternalServerErrorException('Phone or Password not matched');
    }
  }
}
