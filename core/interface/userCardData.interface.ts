export interface UserCardData {
  name: string;
  faculty: string;
  guild?: "BUDDHA" | "VAJRA" | "PADMA" | "RATNA" | "KARMA";
  age?: number;
  email: string;
  username: string;
  description: string;
  updatedAt?: string;
}
