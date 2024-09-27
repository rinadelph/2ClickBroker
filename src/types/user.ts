export interface User {
  id: number;
  email: string;
  name: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}