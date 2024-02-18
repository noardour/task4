export interface IUser {
  id: number;
  name: string;
  email: string;
  lastLoginAt: string | null;
  regesteredAt: string;
  status: "ACTIVE" | "BLOCKED";
}
