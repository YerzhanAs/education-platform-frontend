import {Role} from './role';

export class UserRequest {
  id: number;
  username: string;
  email: string;
  password: string;
  roles: Role[];

  constructor(id: number, username: string, email: string, password: string, roles: Role[]) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.roles = roles;
  }
}
