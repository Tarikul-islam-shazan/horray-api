import { ObjectId } from 'mongodb';
import { AgentEntity } from 'src/agents/entities/agent.entity';
import { Column, Entity, JoinColumn, ObjectIdColumn, OneToOne } from 'typeorm';
import { RoleBase } from '../enums/role.enum';

@Entity()
export class UserEntity {
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

  @OneToOne(() => AgentEntity)
  @JoinColumn()
  agent: AgentEntity;
}
