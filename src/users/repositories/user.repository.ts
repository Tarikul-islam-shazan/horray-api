import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, ObjectID, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import * as brcypt from 'bcrypt';
import { RoleBase } from '../enums/role.enum';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  logger = new Logger('User Repository');

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    try {
      const { firstName, lastName, phone, email, password, role } =
        createUserDto;

      const newUser = this.create({
        firstName,
        lastName,
        phone,
        email,
        password,
        role,
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
        role: newUser.role,
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

  async getUsers(skip: number, limit: number): Promise<any> {
    try {
      skip = skip ? skip : 0;
      limit = limit ? limit : 5;

      const usersList = await this.find({
        skip: skip,
        take: limit,
      });

      return usersList.map((user) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
      }));
    } catch (error) {
      this.logger.error(
        `"src/users/repositories/user.repository.ts", Faild to load!`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async getUserById(id: ObjectID): Promise<any> {
    try {
      const user = await this.findOne(id);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const userInfo = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
      };

      this.logger.verbose(
        `"src/users/repositories/user.repository.ts", User found - data:${JSON.stringify(
          userInfo,
        )}`,
      );

      return userInfo;
    } catch (error) {
      this.logger.error(
        `"src/users/repositories/user.repository.ts", The user with ID ${JSON.stringify(
          id,
        )} not found.`,
      );
      throw new InternalServerErrorException();
    }
  }
}
