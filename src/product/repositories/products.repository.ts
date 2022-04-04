import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { EntityRepository, Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

import { Product } from '../entities/product.entity';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  logger = new Logger('Products Repository');

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const { productName, price } = createProductDto;
      const newProduct = this.create({
        productName,
        price,
      });
      await this.save(newProduct);
      return newProduct;
    } catch (error) {
      this.logger.error(
        `"src/product/repositories/products.repository.ts", Product has not been created!`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async getProductById(id: ObjectId): Promise<Product> {
    try {
      const product = await this.findOne(id);
      if (!product) {
        throw new BadRequestException('Product ID not exists!');
      }
      return product;
    } catch (error) {
      this.logger.error(
        `"src/product/repositories/products.repository.ts", Product has not been found!`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async updateProduct(
    id: ObjectId,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      const product = await this.findOne(id);
      if (!product) {
        throw new BadRequestException('Product ID not exists!');
      }
      const { productName, price, imageUrl } = updateProductDto;
      if (productName) product.productName = productName;
      if (price) product.price = price;
      if (imageUrl) product.imageUrl = imageUrl;
      await this.save(product);
      return product;
    } catch (error) {
      this.logger.error(
        `"src/product/repositories/products.repository.ts", Product has not been found!`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
