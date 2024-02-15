export interface IUser {
  id: number;
  name: string;
  eMail: string;
  lastLogin: string;
  status: "active" | "blocked";
}
