import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { User } from 'src/users/entities/user.entity';
import { UserRepository } from 'src/users/repositories/user.repository';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentMemberDto } from './dto/update-agent-member.dto';
import { Agent } from './entities/agent.entity';
import { AgentsRepository } from './repositories/agents.repository';

@Injectable()
export class AgentsService {
  constructor(
    @InjectRepository(AgentsRepository)
    private agentRepository: AgentsRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async create(createAgentDto: CreateAgentDto): Promise<User> {
    try {
      const { agentRefrence, point, members } = createAgentDto;
      const validUser = await this.userRepository.findOne({
        reference: agentRefrence,
      });
      if (!validUser) {
        throw new NotFoundException(
          'User not found with this reference number.',
        );
      }
      const createdagent = await this.agentRepository.createAgent(
        createAgentDto,
      );
      const agent = new Agent(agentRefrence, point, members);
      agent.id = createdagent.id;
      this.userRepository.update(validUser.id, { agent: agent });
      delete validUser.password;
      return validUser;
    } catch (error) {
      throw new InternalServerErrorException('Agent not created');
    }
  }

  findAll() {
    return `This action returns all agents`;
  }

  findOne(refrence: string) {
    return this.agentRepository.getAgentInfo(refrence);
  }

  update(id: ObjectId, updateAgentMemberDto: UpdateAgentMemberDto, user: User) {
    return this.agentRepository.updateAgentMemeber(
      id,
      updateAgentMemberDto,
      user,
    );
  }

  remove(id: number) {
    return `This action removes a #${id} agent`;
  }
}
