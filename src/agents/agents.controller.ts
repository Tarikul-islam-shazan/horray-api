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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { UserDecorator } from 'src/users/decorators/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { AgentsService } from './agents.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentMemberDto } from './dto/update-agent-member.dto';

@ApiTags('agents')
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

  @ApiBearerAuth()
  @Get(':ref')
  @UseGuards(JwtGuard)
  findOne(@Param('ref') ref: string) {
    return this.agentsService.findOne(ref);
  }

  @ApiBearerAuth()
  @Patch(':id')
  @UseGuards(JwtGuard)
  update(
    @Param('id') id: ObjectId,
    @Body() updateAgentDto: UpdateAgentMemberDto,
    @UserDecorator() user: User,
  ) {
    return this.agentsService.update(id, updateAgentDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agentsService.remove(+id);
  }
}
