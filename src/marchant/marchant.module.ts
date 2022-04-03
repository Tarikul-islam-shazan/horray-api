import { Module } from '@nestjs/common';
import { MarchantService } from './marchant.service';
import { MarchantController } from './marchant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarchantsRepository } from './repositories/marchant.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MarchantsRepository])],
  controllers: [MarchantController],
  providers: [MarchantService],
})
export class MarchantModule {}
