import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsRepository } from './repositories/products.repository';
import { MarchantsRepository } from 'src/marchant/repositories/marchant.repository';
import { FileUploadService } from 'src/common/services/s3-file-upload.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductsRepository, MarchantsRepository]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get('FILE_PATH'),
      }),
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService, FileUploadService, ConfigService],
})
export class ProductModule {}
