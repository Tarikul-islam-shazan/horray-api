import { ObjectId } from 'mongodb';
import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, ObjectIdColumn, OneToMany } from 'typeorm';

@Entity()
export class Marchant {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  imageUrl: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  rating: number;

  @Column()
  discount: number;

  @OneToMany(() => Product, (product) => product.marchant)
  product: Product[];
}
