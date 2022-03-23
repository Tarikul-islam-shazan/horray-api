import { Module } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { AgentsController } from './agents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentsRepository } from './repositories/agents.repository';
import { UserRepository } from 'src/users/repositories/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AgentsRepository, UserRepository])],
  controllers: [AgentsController],
  providers: [AgentsService],
})
export class AgentsModule {}
