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
} from '@nestjs/common';
import { MarchantService } from './marchant.service';
import { CreateMarchantDto } from './dto/create-marchant.dto';
import { UpdateMarchantDto } from './dto/update-marchant.dto';
import { ObjectId } from 'mongodb';

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
}
