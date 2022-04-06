import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { Marchant } from 'src/marchant/entities/marchant.entity';
import { MarchantsRepository } from 'src/marchant/repositories/marchant.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductsRepository } from './repositories/products.repository';

@Injectable()
export class ProductService {
  logger = new Logger('Products service');
  constructor(
    @InjectRepository(ProductsRepository)
    private productsRepository: ProductsRepository,
    @InjectRepository(MarchantsRepository)
    private marchantsRepository: MarchantsRepository,
  ) {}
  async create(
    createProductDto: CreateProductDto,
    marchantId: ObjectId,
  ): Promise<Product> {
    try {
      const marchant = await this.marchantsRepository.findOne(marchantId);
      if (!marchant) {
        throw new BadRequestException('Marchant ID not exists!');
      }
      const product = await this.productsRepository.createProduct(
        createProductDto,
      );
      const { id, name, address, phone } = marchant;
      product.marchant = new Marchant(id, name, address, phone);
      await this.productsRepository.update(product.id, {
        marchant: product.marchant,
      });
      return product;
    } catch (err) {
      this.logger.error(
        `"src/product/product.service.ts", Product has not been created!`,
        err.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: ObjectId) {
    return this.productsRepository.getProductById(id);
  }

  findOneByMarchant(mName: string) {
    return this.productsRepository.getProductByMarchantId(mName);
  }

  update(id: ObjectId, updateProductDto: UpdateProductDto) {
    return this.productsRepository.updateProduct(id, updateProductDto);
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
