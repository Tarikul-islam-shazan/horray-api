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
  Req,
  UploadedFile,
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

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

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
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/products',
        filename: editImageFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  uploadFile(
    @Param('id') id: ObjectId,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const createProductDto: CreateProductDto = new CreateProductDto();
    if (file) {
      createProductDto.imageUrl = file.filename;
      return this.productService.update(id, createProductDto);
    } else {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'No file found',
      };
    }
  }
}