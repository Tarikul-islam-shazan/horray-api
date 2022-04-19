import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
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

  async getProductByMarchantId(marchantName: string): Promise<Product[]> {
    try {
      const product = await this.find({
        where: {
          'marchant.name': { $eq: marchantName },
        },
      });
      this.logger.verbose(
        `"src/product/repositories/products.repository.ts", Product !`,
        product,
      );
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
    prodId: ObjectId,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      const product = await this.findOne(prodId);
      if (!product) {
        throw new BadRequestException('Product ID not exists!');
      }
      await this.update(prodId, updateProductDto);
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
