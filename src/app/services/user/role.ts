
export enum ERole {
  ROLE_USER = 'ROLE_USER',
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_MODERATOR = 'ROLE_MODERATOR'
}


export class Role {
  id: number;
  name: ERole;

  constructor(id: number, name: ERole) {
    this.id = id;
    this.name = name;
  }
}
