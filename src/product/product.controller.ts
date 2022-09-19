import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  HttpStatus,
  UploadedFile,
  Logger,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  editImageFileName,
  imageFileFilter,
} from 'src/common/utils/file-upload.utils';
import { ObjectId } from 'mongodb';
import { ApiTags } from '@nestjs/swagger';
import { FileUploadService } from 'src/common/services/s3-file-upload.service';


@ApiTags('ProductController')
@Controller('product')
export class ProductController {
 
  constructor(
    private readonly productService: ProductService, 
    private readonly fileUploadService: FileUploadService
  ) {}

  @Post(':id')
  create(
    @Param('id') id: ObjectId,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productService.create(createProductDto, id);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.productService.findOne(id);
  }

  @Get('/marchant/:name')
  findOneByMarchant(@Param('name') name: string) {
    return this.productService.findOneByMarchant(name);
  }

  @Patch(':id')
  update(
    @Param('id') id: ObjectId,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }

  @Post('upload/:id')
  @UseInterceptors(
    FileInterceptor('file', 
      {
        fileFilter: imageFileFilter,
      }
    ),
  )
  async uploadFile(
    @Param('id') id: ObjectId,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const updateProductDto: UpdateProductDto = new UpdateProductDto();
    if (file) {
      const data = await this.fileUploadService.upload(file);
      updateProductDto.imageUrl = data["Location"];
      return this.productService.update(id, updateProductDto);
    } else {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'No file found',
      };
    }
  }
}
