import { ObjectId } from 'mongodb';
import { Marchant } from 'src/marchant/entities/marchant.entity';
import { Column, Entity, ManyToOne, ObjectIdColumn } from 'typeorm';

@Entity()
export class Product {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  productName: string;

  @Column()
  imageUrl: string;

  @Column()
  price: string;

  @Column()
  rating: string;

  @Column({ default: true })
  isPublished: boolean;

  @ManyToOne(() => Marchant, (marchant) => marchant.product)
  marchant: Marchant;
}
