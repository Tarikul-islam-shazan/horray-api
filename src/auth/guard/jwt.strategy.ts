import {
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from 'src/users/entities/user.entity';
import { UserRepository } from 'src/users/repositories/user.repository';
import { JwtPayload } from '../interfaces/jwtPayload';

export class JwtStrategy extends PassportStrategy(Strategy) {
  logger = new Logger('Jwt strategy');

  constructor(
    @InjectRepository(UserRepository)
    private usersRepository: UserRepository,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    const { id, phone, roles } = payload;
    try {
      const user: UserEntity = await this.usersRepository.getUserById(id);
      if (!user) {
        throw new UnauthorizedException('The user is not Authorized!');
      }

      const validUser = { id: id, phone: phone, roles: roles };
      this.logger.verbose(
        `"src/auth/guard/jwt.strategy.ts", Valid user ${JSON.stringify(
          validUser,
        )}`,
      );
      return validUser;
    } catch (error) {
      this.logger.error(
        `"src/auth/guard/jwt.strategy.ts", Unauthorized access`,
      );
      throw new InternalServerErrorException();
    }
  }
}
