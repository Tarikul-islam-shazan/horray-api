import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { CreateMarchantDto } from './dto/create-marchant.dto';
import { UpdateMarchantDto } from './dto/update-marchant.dto';
import { MarchantsRepository } from './repositories/marchant.repository';

@Injectable()
export class MarchantService {
  constructor(
    @InjectRepository(MarchantsRepository)
    private marchantsRepository: MarchantsRepository,
  ) {}

  create(createMarchantDto: CreateMarchantDto) {
    return this.marchantsRepository.createMarchant(createMarchantDto);
  }

  findAll(skip: number, limit: number) {
    return this.marchantsRepository.getAllMarchant(skip, limit);
  }

  findOne(id: ObjectId) {
    return this.marchantsRepository.getMarchantById(id);
  }

  update(id: ObjectId, updateMarchantDto: UpdateMarchantDto) {
    return this.marchantsRepository.updateMarchant(id, updateMarchantDto);
  }

  remove(id: number) {
    return `This action removes a #${id} marchant`;
  }
}
