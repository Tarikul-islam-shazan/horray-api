import { ObjectID } from 'typeorm';

export class JwtPayload {
  id: ObjectID;
  phone: string;
}
