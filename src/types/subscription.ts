export interface Subscription {
  id: number;
  userId: number;
  tier: string;
  startDate: Date;
  endDate: Date | null;
}