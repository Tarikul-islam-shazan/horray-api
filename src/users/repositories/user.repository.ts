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
      const { firstName, lastName, phone, email, password, roles } =
        createUserDto;

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
      [newUser.roles] = [roles];
      newUser.reference =
        'H' +
        Date.parse(Date()) +
        '' +
        Math.floor(100000 + Math.random() * 900000);

      this.logger.verbose(
        `"src/users/repositories/user.repository.ts", A Reference number generated! Data ${JSON.stringify(
          newUser.reference,
        )}`,
      );

      await this.save(newUser);

      const validUser = {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        phone: newUser.phone,
        email: newUser.email,
        roles: newUser.roles,
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

  async getUsers(skip: number, limit: number, user: UserEntity): Promise<any> {
    try {
      skip = skip ? skip : 0;
      limit = limit ? limit : 5;
      this.logger.verbose(
        `"src/users/repositories/user.repository.ts", Faild to load!`,
        user,
      );
      const isAdmin: boolean = user.roles.includes(RoleBase.ADMIN);
      if (!isAdmin) {
        throw new ForbiddenException('This user has no acess!');
      }
      this.logger.verbose(
        `"src/users/repositories/user.repository.ts", User has no access right!`,
        user,
      );
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
        roles: user.roles,
        reference: user.reference,
        agent: user.agent,
      }));
    } catch (error) {
      this.logger.error(
        `"src/users/repositories/user.repository.ts", Faild to load!`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async getUserById(id: ObjectID): Promise<UserEntity> {
    try {
      const user = await this.findOne(id);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      this.logger.verbose(
        `"src/users/repositories/user.repository.ts", User found - data:${JSON.stringify(
          user,
        )}`,
      );
      delete user.password;
      return user;
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
