import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  HttpStatus,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MarchantService } from './marchant.service';
import { CreateMarchantDto } from './dto/create-marchant.dto';
import { UpdateMarchantDto } from './dto/update-marchant.dto';
import { ObjectId } from 'mongodb';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  editImageFileName,
  imageFileFilter,
} from 'src/common/utils/file-upload.utils';

@Controller('marchant')
export class MarchantController {
  constructor(private readonly marchantService: MarchantService) {}

  @Post()
  create(@Body() createMarchantDto: CreateMarchantDto) {
    return this.marchantService.create(createMarchantDto);
  }

  @Get()
  findAll(
    @Query('skip', ParseIntPipe) skip: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.marchantService.findAll(skip, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.marchantService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: ObjectId,
    @Body() updateMarchantDto: UpdateMarchantDto,
  ) {
    return this.marchantService.update(id, updateMarchantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marchantService.remove(+id);
  }

  @Post('upload/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/marchants',
        filename: editImageFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  uploadFile(
    @Param('id') id: ObjectId,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const updateProductDto: UpdateMarchantDto = new UpdateMarchantDto();
    if (file) {
      updateProductDto.imageUrl = file.filename;
      return this.marchantService.update(id, updateProductDto);
    } else {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'No file found',
      };
    }
  }
}
