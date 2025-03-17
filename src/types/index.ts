export interface IUser {
  id: string;
  email: string;
  role: string;
  name: string;
  img: string;
  domain: string;
  iat?: number;
  exp?: number;
}
