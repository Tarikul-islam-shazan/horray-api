import {
  IsNotEmpty,
  IsString,
  Length,
  IsDecimal,
  IsOptional,
} from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @Length(2, 50)
  productName?: string;

  @IsOptional()
  @IsDecimal()
  price?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
