import { ObjectId } from 'mongodb';
import { Agent } from 'src/agents/entities/agent.entity';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { RoleBase } from '../enums/role.enum';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column()
  reference: string;

  @Column()
  roles: RoleBase[];

  @Column(() => Agent)
  agent: Agent;
}
