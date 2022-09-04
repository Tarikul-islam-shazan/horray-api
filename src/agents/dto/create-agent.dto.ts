import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAgentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  agentRefrence: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  point: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  members: string[];
}
