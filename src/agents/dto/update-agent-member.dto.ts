import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAgentMemberDto {
  @IsNotEmpty()
  @IsString()
  memberRefrence: string;
}
