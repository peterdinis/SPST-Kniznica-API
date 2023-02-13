export interface IUser {
  id?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  name: string;
  lastName: string;
  email: string;
  password: string;
  profilePic?: string | null;
  refreshToken: string;
  borrowedBooks: any; // TODO: Update later,
  role: string;
}
