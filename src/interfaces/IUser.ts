enum Role {
  USER,
  ADMIN,
  TEACHER,
}

export interface IUser {
  id?: number;
  email: string;
  name: string;
  lastName: string;
  password: string;
  role: Role;
}
