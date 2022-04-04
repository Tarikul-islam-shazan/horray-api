import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { MarchantsRepository } from 'src/marchant/repositories/marchant.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
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
  ): Promise<any> {
    try {
      const marchant = await this.marchantsRepository.findOne(marchantId);
      if (!marchant) {
        throw new BadRequestException('Marchant ID not exists!');
      }
      const { id } = await this.productsRepository.createProduct(
        createProductDto,
      );
      const newProduct = await this.productsRepository.findOne(id);
      newProduct.marchant = marchant;
      await this.productsRepository.save(newProduct);
      return newProduct;
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

  update(id: ObjectId, updateProductDto: UpdateProductDto) {
    return this.productsRepository.updateProduct(id, updateProductDto);
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
