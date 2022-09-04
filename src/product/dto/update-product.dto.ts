import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, Length, IsDecimal, IsOptional } from 'class-validator';

export class UpdateProductDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(2, 50)
  productName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDecimal()
  price?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
