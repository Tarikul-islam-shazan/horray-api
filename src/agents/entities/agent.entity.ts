import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Agent {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  agentRefrence: string;

  @Column()
  point: number;

  @Column()
  members: string[];

  constructor(agentRefrence: string, point: number, members: string[]) {
    this.agentRefrence = agentRefrence;
    this.point = point;
    this.members = members;
  }
}
