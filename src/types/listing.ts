export interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}