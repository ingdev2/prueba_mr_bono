import { IRole } from './user_role.interface';

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: IRole[];
}
