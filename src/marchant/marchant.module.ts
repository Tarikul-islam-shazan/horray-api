import { Module } from '@nestjs/common';
import { MarchantService } from './marchant.service';
import { MarchantController } from './marchant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarchantsRepository } from './repositories/marchant.repository';
import { FileUploadService } from 'src/common/services/s3-file-upload.service';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [TypeOrmModule.forFeature([MarchantsRepository])],
  controllers: [MarchantController],
  providers: [MarchantService, FileUploadService, ConfigService],
})
export class MarchantModule {}
