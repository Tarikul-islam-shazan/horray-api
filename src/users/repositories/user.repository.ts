import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import * as brcypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  logger = new Logger('User Repository');

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    try {
      const { firstName, lastName, phone, email, password } = createUserDto;

      const newUser = this.create({
        firstName,
        lastName,
        phone,
        email,
        password,
      });

      const isExist = await this.findOne({
        phone: newUser.phone,
      });

      if (isExist) {
        throw new BadRequestException('User already exists!');
      }

      const salt = await brcypt.genSalt(12);
      const hashedPassword = await brcypt.hash(newUser.password, salt);
      newUser.password = hashedPassword;

      await this.save(newUser);

      const validUser = {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        phone: newUser.phone,
        email: newUser.email,
      };

      this.logger.verbose(
        `"src/users/repositories/user.repository.ts", A new user is created! Data ${JSON.stringify(
          validUser,
        )}`,
      );

      return validUser;
    } catch (error) {
      this.logger.error(
        `"src/users/repositories/user.repository.ts", User already exists!`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
