import { RoleBase } from 'src/users/enums/role.enum';
import { ObjectID } from 'typeorm';

export class JwtPayload {
  id: ObjectID;
  phone: string;
  roles: RoleBase[];
}
