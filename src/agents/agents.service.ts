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
      const { agentRefrence } = createAgentDto;
      const validUser = await this.userRepository.findOne({
        reference: agentRefrence,
      });
      if (!validUser) {
        throw new NotFoundException(
          'User not found with this reference number.',
        );
      }
      const agent: Agent = await this.agentRepository.createAgent(
        createAgentDto,
      );
      validUser.agent = agent;
      this.userRepository.save(validUser);
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

  update(id: ObjectId, updateAgentMemberDto: UpdateAgentMemberDto) {
    return this.agentRepository.updateAgentMemeber(id, updateAgentMemberDto);
  }

  remove(id: number) {
    return `This action removes a #${id} agent`;
  }
}
