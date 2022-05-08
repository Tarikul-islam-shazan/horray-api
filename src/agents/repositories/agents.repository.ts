import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { User } from 'src/users/entities/user.entity';
import { RoleBase } from 'src/users/enums/role.enum';
import { EntityRepository, Repository } from 'typeorm';
import { CreateAgentDto } from '../dto/create-agent.dto';
import { UpdateAgentMemberDto } from '../dto/update-agent-member.dto';
import { Agent } from '../entities/agent.entity';

@EntityRepository(Agent)
export class AgentsRepository extends Repository<Agent> {
  logger = new Logger('Agent Repository');

  async createAgent(createAgent: CreateAgentDto): Promise<any> {
    try {
      const { agentRefrence, point, members } = createAgent;
      const newAgent = this.create({
        agentRefrence,
        point,
        members,
      });
      const isExist = await this.findOne({
        agentRefrence: newAgent.agentRefrence,
      });
      if (isExist) {
        throw new BadRequestException('Agent has already exist!');
      }
      await this.save(newAgent);
      this.logger.verbose(
        `"src/agents/repositories/agents.repository.ts",New Agent ${JSON.stringify(
          newAgent,
        )}`,
      );
      return newAgent;
    } catch (error) {
      throw new InternalServerErrorException(
        'Server error for agent creation.',
      );
    }
  }

  async updateAgentMemeber(
    id: ObjectId,
    updateAgentMemberDto: UpdateAgentMemberDto,
    user: User,
  ) {
    try {
      const isAgent: boolean = user.roles.includes(RoleBase.AGENT);
      if (!isAgent) {
        throw new ForbiddenException('This user has no acess!');
      }
      const { memberRefrence } = updateAgentMemberDto;
      const validAgent = await this.findOne(id);
      if (!validAgent) {
        throw new NotFoundException('Agent not found');
      }
      const isMemberExist = validAgent.members.includes(memberRefrence);
      if (isMemberExist) {
        throw new BadRequestException('Member exist');
      }
      validAgent.members.push(memberRefrence);
      this.logger.verbose(
        `"src/agents/repositories/agents.repository.ts", Now agent member: ${JSON.stringify(
          validAgent,
        )}`,
      );
      await this.save(validAgent);
      return validAgent;
    } catch (error) {
      throw new InternalServerErrorException('Agent member not updated');
    }
  }

  async getAgentInfo(ref: string): Promise<Agent> {
    try {
      const agent = await this.findOne({ agentRefrence: ref });
      if (!agent) {
        throw new NotFoundException('Agent not found!');
      }
      return agent;
    } catch (error) {
      throw new InternalServerErrorException(
        'Server error for agent creation.',
      );
    }
  }
}
