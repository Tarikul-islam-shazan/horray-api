import {
  IsDecimal,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  productName: string;

  @IsNotEmpty()
  @IsDecimal()
  price: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
