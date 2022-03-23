import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAgentDto {
  @IsNotEmpty()
  @IsString()
  agentRefrence: string;

  @IsNotEmpty()
  @IsNumber()
  point: number;

  @IsNotEmpty()
  @IsArray()
  members: string[];
}
