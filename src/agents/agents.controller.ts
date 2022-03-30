import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { AgentsService } from './agents.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentMemberDto } from './dto/update-agent-member.dto';

@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Post()
  create(@Body() createAgentDto: CreateAgentDto) {
    return this.agentsService.create(createAgentDto);
  }

  @Get()
  findAll() {
    return this.agentsService.findAll();
  }

  @Get(':ref')
  @UseGuards(JwtGuard)
  findOne(@Param('ref') ref: string) {
    return this.agentsService.findOne(ref);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  update(
    @Param('id') id: ObjectId,
    @Body() updateAgentDto: UpdateAgentMemberDto,
  ) {
    return this.agentsService.update(id, updateAgentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agentsService.remove(+id);
  }
}
