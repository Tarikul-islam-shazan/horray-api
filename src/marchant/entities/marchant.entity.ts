import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

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

  constructor(id: ObjectId, name: string, address: string, phone: string) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.phone = phone;
  }
}
