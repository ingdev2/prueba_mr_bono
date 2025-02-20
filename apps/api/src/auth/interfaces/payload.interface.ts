import { IRole } from 'src/utils/interfaces/user_role.interface';

export interface Payload {
  sub: string;
  name: string;
  email: string;
  role: IRole[];
}
