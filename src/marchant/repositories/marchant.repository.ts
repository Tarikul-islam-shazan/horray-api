import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { EntityRepository, Repository } from 'typeorm';
import { CreateMarchantDto } from '../dto/create-marchant.dto';
import { UpdateMarchantDto } from '../dto/update-marchant.dto';
import { Marchant } from '../entities/marchant.entity';

@EntityRepository(Marchant)
export class MarchantsRepository extends Repository<Marchant> {
  logger = new Logger('Marchant Repository');

  async createMarchant(createMarchantDto: CreateMarchantDto): Promise<any> {
    try {
      const { name, address, email, phone, latitude, longitude, discount } =
        createMarchantDto;
      const newMarchant = this.create({
        name,
        address,
        email,
        phone,
        latitude,
        longitude,
        discount,
      });
      const isExist = await this.findOne({
        phone: newMarchant.phone,
      });
      if (isExist) {
        throw new BadRequestException('Marchant has already exist!');
      }
      const isEmailExist = await this.findOne({
        email: newMarchant.email,
      });
      if (isEmailExist) {
        throw new BadRequestException('Email  has already exist!');
      }
      newMarchant.rating = 0;
      await this.save(newMarchant);
      const validMarchant = {
        name: newMarchant.name,
        address: newMarchant.address,
        email: newMarchant.email,
        phone: newMarchant.phone,
        latitude: newMarchant.latitude,
        longitude: newMarchant.longitude,
        discount: newMarchant.discount,
      };
      this.logger.verbose(
        `"src/users/repositories/user.repository.ts", A new user is created! Data ${JSON.stringify(
          validMarchant,
        )}`,
      );
      return validMarchant;
    } catch (error) {
      this.logger.error(
        `"src/marchant/repositories/marchant.repository.ts", Marchant has not been created!`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async getAllMarchant(skip: number, limit: number): Promise<Marchant[]> {
    try {
      skip = skip ? skip : 0;
      limit = limit ? limit : 5;
      const marchantList = await this.find({
        skip: skip,
        take: limit,
      });
      return marchantList;
    } catch (error) {
      this.logger.error(
        `"src/marchant/repositories/marchant.repository.ts", Faild to load!`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async getMarchantById(id: ObjectId): Promise<Marchant> {
    try {
      const marchant = await this.findOne(id);
      if (!marchant) {
        throw new BadRequestException('Marchant ID not exists!');
      }
      return marchant;
    } catch (error) {
      this.logger.error(
        `"src/marchant/repositories/marchant.repository.ts", Faild to load!`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async updateMarchant(
    id: ObjectId,
    updateMarchantDto: UpdateMarchantDto,
  ): Promise<Marchant> {
    try {
      const marchant = await this.findOne(id);
      if (!marchant) {
        throw new BadRequestException('Marchant ID not exists!');
      }
      const {
        name,
        address,
        email,
        phone,
        imageUrl,
        latitude,
        longitude,
        discount,
      } = updateMarchantDto;
      const updatedMarchant = marchant;
      if (name) {
        updatedMarchant.name = name;
      }
      if (address) {
        updatedMarchant.address = address;
      }
      if (email) {
        updatedMarchant.email = email;
      }
      if (phone) {
        updatedMarchant.phone = phone;
      }
      if (imageUrl) {
        updatedMarchant.imageUrl = imageUrl;
      }
      if (latitude) {
        updatedMarchant.latitude = latitude;
      }
      if (longitude) {
        updatedMarchant.longitude = longitude;
      }
      if (discount) {
        updatedMarchant.discount = discount;
      }
      await this.save(updatedMarchant);
      return updatedMarchant;
    } catch (error) {
      this.logger.error(
        `"src/marchant/repositories/marchant.repository.ts", Faild to update!`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
